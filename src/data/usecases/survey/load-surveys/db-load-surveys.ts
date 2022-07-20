import { LoadSurveys, LoadSurveysRepository } from './db-load-survey-protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<LoadSurveysRepository.Result> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId)
    return surveys
  }
}
