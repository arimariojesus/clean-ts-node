export const signUpParamsSchema = {
  type: 'object',
  required: ['*'],
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    passwordConfirmation: { type: 'string' },
    password: { type: 'string' }
  }
}
