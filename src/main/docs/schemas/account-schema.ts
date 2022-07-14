export const accountSchema = {
  required: ['*'],
  type: 'object',
  properties: {
    accessToken: { type: 'string' },
    name: { type: 'string' }
  }
}
