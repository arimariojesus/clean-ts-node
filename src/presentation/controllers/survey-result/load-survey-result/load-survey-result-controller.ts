import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './load-survey-result-controller-protocols'
import { forbidden } from '@/presentation/helpers/http/http-helpers'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params: { surveyId } } = httpRequest
    const survey = await this.loadSurveyById.loadById(surveyId)
    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'))
    }
    return await Promise.resolve(null)
  }
}
