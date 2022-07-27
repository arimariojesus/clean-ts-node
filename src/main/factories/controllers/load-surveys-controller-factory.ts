import { makeLogControllerDecorator, makeDbALoadSurveys } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadSurveysController } from '@/presentation/controllers'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbALoadSurveys())
  return makeLogControllerDecorator(controller)
}
