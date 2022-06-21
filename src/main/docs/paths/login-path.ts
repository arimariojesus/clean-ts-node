export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'API parar autenticar usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/login-params'
          }
        }
      }
    },
    responses: {
      200: { $ref: '#/components/success' },
      400: { $ref: '#/components/bad-request' },
      401: { $ref: '#/components/unauthorized' },
      404: { $ref: '#/components/not-found' },
      500: { $ref: '#/components/server-error' }
    }
  }
}
