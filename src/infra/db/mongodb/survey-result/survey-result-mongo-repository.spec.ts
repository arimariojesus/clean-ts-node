import { Collection, ObjectId } from 'mongodb'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'

const makeSurvey = async (): Promise<SurveyModel> => {
  const { insertedId: _id } = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }, {
      answer: 'other_answer'
    }],
    date: new Date()
  })
  const survey = await surveyCollection.findOne({ _id })
  return MongoHelper.map<SurveyModel>(survey)
}

const makeAccount = async (): Promise<AccountModel> => {
  const { insertedId: _id } = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    passwer: 'any_password'
  })
  const account = await accountCollection.findOne({ _id })
  return MongoHelper.map<AccountModel>(account)
}

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResult')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].answer).toBe(survey.answers[0].answer)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
    })
  })

  test('Should update survey result if its not new', async () => {
    const survey = await makeSurvey()
    const account = await makeAccount()
    await surveyResultCollection.insertOne({
      surveyId: new ObjectId(survey.id),
      accountId: new ObjectId(account.id),
      answer: survey.answers[0].answer,
      date: new Date()
    })
    const sut = makeSut()
    const surveyResult = await sut.save({
      surveyId: survey.id,
      accountId: account.id,
      answer: survey.answers[1].answer,
      date: new Date()
    })
    expect(surveyResult).toBeTruthy()
    expect(surveyResult.surveyId).toEqual(survey.id)
    expect(surveyResult.answers[0].answer).toBe(survey.answers[1].answer)
    expect(surveyResult.answers[0].count).toBe(1)
    expect(surveyResult.answers[0].percent).toBe(100)
    expect(surveyResult.answers[1].count).toBe(0)
    expect(surveyResult.answers[1].percent).toBe(0)
  })
})