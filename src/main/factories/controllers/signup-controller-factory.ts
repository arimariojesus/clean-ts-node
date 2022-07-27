import { makeDbAuthentication, makeSignValidation, makeDbAddAccount, makeLogControllerDecorator } from '@/main/factories'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
