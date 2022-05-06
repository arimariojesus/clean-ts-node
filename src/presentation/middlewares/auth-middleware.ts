import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helpers'
import { Middleware, HttpRequest, HttpResponse } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new AccessDeniedError())
    return await Promise.resolve(error)
  }
}
