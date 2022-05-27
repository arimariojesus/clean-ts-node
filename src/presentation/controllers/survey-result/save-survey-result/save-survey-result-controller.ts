import { Controller, HttpRequest, HttpResponse, LoadSurveyById, InvalidParamError, forbidden } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params } = httpRequest

    const survey = await this.loadSurveyById.loadById(params.surveyId)

    if (!survey) {
      return forbidden(new InvalidParamError('survey_id'))
    }

    return null
  }
}
