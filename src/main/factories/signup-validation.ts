import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFieldComposite } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validaton'
import { CompareFieldsComposite } from '../../presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../presentation/helpers/validators/email-validation'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignValidaiton = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldComposite(field))
  }
  validations.push(new CompareFieldsComposite('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}