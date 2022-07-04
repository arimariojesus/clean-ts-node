export const signUpPath = {
  post: {
    tags: ['Login'],
    summary: 'API para autenticar usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signup-params'
          }
        }
      }
    },
    responses: {
      200: { $ref: '#/components/success' },
      400: { $ref: '#/components/bad-request' },
      403: { $ref: '#/components/forbidden' },
      404: { $ref: '#/components/not-found' },
      500: { $ref: '#/components/server-error' }
    }
  }
}
