export const surveyResultAnswerSchema = {
  required: ['answer', 'count', 'percent'],
  type: 'object',
  properties: {
    image: { type: 'string' },
    answer: { type: 'string' },
    count: { type: 'number' },
    percent: { type: 'number' }
  }
}
