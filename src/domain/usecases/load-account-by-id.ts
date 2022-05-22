import { SurveyModel } from '@/domain/models/survey'

export interface LoadAccountById {
  loadById (id: string): Promise<SurveyModel>
}
