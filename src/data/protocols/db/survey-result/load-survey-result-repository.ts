import { SurveyResultModel } from '@/domain/models/survey-result'

export interface LoadSurveyResultRepository {
  loadBySurveyId (string: string): Promise<SurveyResultModel>
}
