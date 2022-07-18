import { Controller, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'
import { serverError, ok } from '@/presentation/helpers/http/http-helpers'
import { LogErrorRepositorySpy } from '@/data/test'
import { faker } from '@faker-js/faker'

class ControllerSpy implements Controller {
  httpResponse = ok(faker.datatype.uuid())
  request: any

  async handle (request: any): Promise<HttpResponse> {
    this.request = request
    return await Promise.resolve(this.httpResponse)
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  it('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const request = faker.lorem.sentence()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })

  it('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(faker.lorem.sentence())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError
    const request = faker.lorem.sentence()
    await sut.handle(request)
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
