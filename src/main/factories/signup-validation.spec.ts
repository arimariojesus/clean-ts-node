import { makeSignValidaiton } from './signup-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { RequiredFieldComposite } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validaton'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('SignUpValidaiton', () => {
  test('Should call ValidaitonComposite with all validations', () => {
    makeSignValidaiton()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldComposite(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
