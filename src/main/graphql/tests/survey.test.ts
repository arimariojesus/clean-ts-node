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

describe('Survey GraphQL', () => {
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

  describe('Surveys Query', () => {
    const query = `query {
      surveys {
        id
        question
        answers {
          image
          answer
        }
        date
        didAnswer
      }
    }`

    test('Should return Surveys', async () => {
      const accessToken = await makeAccessToken()
      const survey = mockAddSurveyParams()
      await surveyCollection.insertOne(survey)
      const res = await request(app)
        .post('/graphql')
        .set('x-access-token', accessToken)
        .send({ query })
      expect(res.status).toBe(200)
      expect(res.body.data.surveys.length).toBe(1)
      expect(res.body.data.surveys[0].id).toBeTruthy()
      expect(res.body.data.surveys[0].question).toBe(survey.question)
      expect(res.body.data.surveys[0].date).toBe(survey.date.toISOString())
      expect(res.body.data.surveys[0].didAnswer).toBe(false)
      expect(res.body.data.surveys[0].answers).toEqual([
        survey.answers[0],
        { ...survey.answers[1], image: null }
      ])
    })

    test('Should return AccessDeniedError if no token is provided', async () => {
      const survey = mockAddSurveyParams()
      await surveyCollection.insertOne(survey)
      const res = await request(app)
        .post('/graphql')
        .send({ query })
      expect(res.status).toBe(403)
      expect(res.body.data).toBeFalsy()
      expect(res.body.errors[0].message).toBe('Access denied')
    })
  })
})
