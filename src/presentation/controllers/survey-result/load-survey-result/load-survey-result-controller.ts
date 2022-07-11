import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest
    const { surveyId } = params
    await this.loadSurveyById.loadById(surveyId)
    return await Promise.resolve(null)
  }
}
