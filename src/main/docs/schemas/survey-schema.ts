export const surveySchema = {
  required: ['*'],
  type: 'object',
  properties: {
    id: { type: 'string' },
    question: { type: 'string' },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/survey-answer'
      }
    },
    date: { type: 'string' }
  }
}
