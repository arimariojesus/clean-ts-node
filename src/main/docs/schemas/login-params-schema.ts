export const loginParamsSchema = {
  type: 'object',
  required: ['*'],
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  }
}
