import { SurveyResultModel } from '@/domain/models/survey-result'

export interface LoadSurveyResultRepository {
  loadBySurveyId (string: string, accountId: string): Promise<SurveyResultModel>
}
