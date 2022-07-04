export const surveyPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Enquete'],
    summary: 'API para listar todas as enquetes',
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
  },
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Enquete'],
    summary: 'API para criar uma enquete',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/add-survey-params'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Sucesso'
      },
      403: { $ref: '#/components/forbidden' },
      404: { $ref: '#/components/not-found' },
      500: { $ref: '#/components/server-error' }
    }
  }
}
