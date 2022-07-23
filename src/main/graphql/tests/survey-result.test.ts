import { Collection } from 'mongodb'
import { Express } from 'express'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { setupApp } from '@/main/config/app'
import { mockAddSurveyParams } from '@/domain/test'
import env from '@/main/config/env'

let app: Express
let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'John Doe',
    email: 'joe_doe@mail.com',
    password: '123',
    role: 'admin'
  })
  const { insertedId } = res
  const id = insertedId.toHexString()
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: insertedId
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('SurveyResult GraphQL', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('SurveyResult Query', () => {
    const surveyResultQuery = (surveyId: string): string => (`query {
      surveyResult (surveyId: "${surveyId}") {
        question
        answers {
          answer
          count
          percent
          isCurrentAccountAnswer
        }
        date
      }
    }`)

    test('Should return SurveyResult', async () => {
      const accessToken = await makeAccessToken()
      const survey = mockAddSurveyParams()
      const surveyRes = await surveyCollection.insertOne(survey)
      const query = surveyResultQuery(surveyRes.insertedId.toHexString())
      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.surveyResult.question).toBe(survey.question)
      expect(res.body.data.surveyResult.date).toBe(survey.date.toISOString())
      expect(res.body.data.surveyResult.answers).toEqual([
        {
          answer: survey.answers[0].answer,
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false
        },
        {
          answer: survey.answers[1].answer,
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false
        }
      ])
    })

    test('Should return AccessDeniedError if no token is provided', async () => {
      const survey = mockAddSurveyParams()
      const surveyRes = await surveyCollection.insertOne(survey)
      const query = surveyResultQuery(surveyRes.insertedId.toHexString())
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Access denied')
    })
  })

  describe('SaveSurveyResult Mutation', () => {
    const saveSurveyResultMutation = (surveyId: string, answer: string): string => (`mutation {
      saveSurveyResult (surveyId: "${surveyId}", answer: "${answer}") {
        question
        answers {
          answer
          count
          percent
          isCurrentAccountAnswer
        }
        date
      }
    }`)

    test('Should return SurveyResult', async () => {
      const accessToken = await makeAccessToken()
      const survey = mockAddSurveyParams()
      const surveyRes = await surveyCollection.insertOne(survey)
      const query = saveSurveyResultMutation(surveyRes.insertedId.toHexString(), survey.answers[0].answer)
      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.saveSurveyResult.question).toBe(survey.question)
      expect(res.body.data.saveSurveyResult.date).toBe(survey.date.toISOString())
      expect(res.body.data.saveSurveyResult.answers).toEqual([
        {
          answer: survey.answers[0].answer,
          count: 1,
          percent: 100,
          isCurrentAccountAnswer: true
        },
        {
          answer: survey.answers[1].answer,
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false
        }
      ])
    })

    test('Should return AccessDeniedError if no token is provided', async () => {
      const survey = mockAddSurveyParams()
      const surveyRes = await surveyCollection.insertOne(survey)
      const query = saveSurveyResultMutation(surveyRes.insertedId.toHexString(), survey.answers[0].answer)
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Access denied')
    })
  })
})
