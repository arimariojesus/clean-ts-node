export const surveyPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Enquete'],
    summary: 'API parar listar todas as enquetes',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveys'
            }
          }
        }
      },
      403: { $ref: '#/components/forbidden' },
      404: { $ref: '#/components/not-found' },
      500: { $ref: '#/components/server-error' }
    }
  }
}
