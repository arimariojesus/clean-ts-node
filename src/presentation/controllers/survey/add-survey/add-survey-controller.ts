import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helpers'
import { AddSurvey, Controller, HttpResponse, Validation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (request: AddSurveyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { question, answers } = request
      await this.addSurvey.add({
        question,
        answers,
        date: new Date()
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddSurveyController {
  type Answer = {
    image?: string
    answer: string
  }

  export type Request = {
    question: string
    answers: Answer[]
  }
}
