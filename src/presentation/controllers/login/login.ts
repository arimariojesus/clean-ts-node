import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return await Promise.resolve(badRequest(new MissingParamError('email')))
      }

      if (!password) {
        return await Promise.resolve(badRequest(new MissingParamError('password')))
      }

      const emailIsValid = this.emailValidator.isValid(email)

      if (!emailIsValid) {
        return await Promise.resolve(badRequest(new InvalidParamError('email')))
      }

      return await Promise.resolve(ok(null))
    } catch (error) {
      return serverError(error)
    }
  }
}
