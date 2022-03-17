import { MissingParamError } from '../../errors'
import { Validation } from './validaton'

export class RequiredFieldComposite implements Validation {
  private readonly fieldName: string

  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error | null {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }

    return null
  }
}
