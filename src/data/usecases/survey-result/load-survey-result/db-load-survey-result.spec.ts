import { DbLoadSurveyResult } from './db-load-survey-result'
import { LoadSurveyByIdRepositorySpy, LoadSurveyResultRepositorySpy } from '@/data/test'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositorySpy: LoadSurveyResultRepositorySpy
  loadSurveyByIdRepositorySpy: LoadSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositorySpy = new LoadSurveyResultRepositorySpy()
  const loadSurveyByIdRepositorySpy = new LoadSurveyByIdRepositorySpy()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy)

  return {
    sut,
    loadSurveyResultRepositorySpy,
    loadSurveyByIdRepositorySpy
  }
}

let surveyId: string

describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    surveyId = faker.datatype.uuid()
  })

  test('Should call LoadSurveyResultRespository', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    await sut.load(surveyId)
    expect(loadSurveyResultRepositorySpy.surveyId).toBe(surveyId)
  })

  test('Should throw if LoadSurveyResultRespository throws', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySpy, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.load(surveyId)
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRespository returns null', async () => {
    const { sut, loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy } = makeSut()
    loadSurveyResultRepositorySpy.surveyResultModel = null
    await sut.load(surveyId)
    await expect(loadSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  test('Should return surveyResultModel with all answers with count 0 if LoadSurveyResultRespository returns null', async () => {
    const { sut, loadSurveyResultRepositorySpy, loadSurveyByIdRepositorySpy } = makeSut()
    loadSurveyResultRepositorySpy.surveyResultModel = null
    const surveyResult = await sut.load(surveyId)
    const { surveyModel } = loadSurveyByIdRepositorySpy
    expect(surveyResult).toEqual({
      surveyId: surveyModel.id,
      question: surveyModel.question,
      date: surveyModel.date,
      answers: surveyModel.answers.map(answer => Object.assign({}, answer, {
        count: 0,
        percent: 0
      }))
    })
  })

  test('Should return surveyResultModel on success', async () => {
    const { sut, loadSurveyResultRepositorySpy } = makeSut()
    const surveyResult = await sut.load(surveyId)
    expect(surveyResult).toEqual(loadSurveyResultRepositorySpy.surveyResultModel)
  })
})
