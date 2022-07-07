export const surveyResultSchema = {
  required: ['*'],
  type: 'object',
  properties: {
    question: { type: 'string' },
    surveyId: { type: 'string' },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/survey-result-answer'
      }
    },
    date: { type: 'string' }
  }
}
