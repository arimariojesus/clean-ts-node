export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Misssin param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
