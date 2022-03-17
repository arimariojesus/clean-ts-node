import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFieldComposite } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validaton'

export const makeSignValidaiton = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldComposite(field))
  }
  return new ValidationComposite(validations)
}
