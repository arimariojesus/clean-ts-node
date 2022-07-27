import { SurveyMongoRepository } from '@/infra/db'
import { LoadSurveys } from '@/domain/usecases'
import { DbLoadSurveys } from '@/data/usecases'

export const makeDbALoadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
