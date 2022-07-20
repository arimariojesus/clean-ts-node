import { LoadAnswersBySurvey, LoadAnswersBySurveyRepository } from './db-load-answers-by-survey-protocols'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (private readonly loadAnswersSurveyRepository: LoadAnswersBySurveyRepository) {}

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    return await this.loadAnswersSurveyRepository.loadAnswers(id)
  }
}
