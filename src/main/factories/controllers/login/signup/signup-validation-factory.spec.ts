import { ValidationComposite, RequiredFieldValidation, EmailValidation, CompareFieldsValidation } from '@/validation/validators'
import { makeSignValidation } from './signup-validation-factory'
import { Validation } from '@/presentation/protocols/validaton'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
