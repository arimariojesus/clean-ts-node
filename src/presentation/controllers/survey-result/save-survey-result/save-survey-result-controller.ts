import { Controller, HttpRequest, HttpResponse, LoadSurveyById, InvalidParamError } from './save-survey-result-controller-protocols'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helpers'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { params } = httpRequest

      const survey = await this.loadSurveyById.loadById(params.surveyId)

      if (!survey) {
        return forbidden(new InvalidParamError('survey_id'))
      }

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
