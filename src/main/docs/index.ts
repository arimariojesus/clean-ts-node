import { loginPath, surveyPath, signUpPath } from './paths'
import { badRequest, serverError, notFound, success, forbidden, unauthorized } from './components'
import { accountSchema, errorSchema, loginParamsSchema, signUpParamsSchema, surveyAnswerSchema, surveySchema, surveysSchema, apiKeyAuthSchema } from './schemas'

export default {
  openapi: '3.0.3',
  info: {
    title: 'Clean Node API',
    description: 'API para realização de enquetes entre programadores',
    version: '1.0.0',
    author: 'Arimário Jesus <arimario.jesus@hotmail.com> (https://github.com/arimariojesus)',
    termsOfService: '#'
  },
  license: {
    name: 'ISC',
    url: 'https://opensource.org/licenses/ISC'
  },
  servers: [{
    url: '/api',
    description: 'Servidor local'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    'login-params': loginParamsSchema,
    'signup-params': signUpParamsSchema,
    error: errorSchema,
    survey: surveySchema,
    surveys: surveysSchema,
    'survey-answer': surveyAnswerSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    'bad-request': badRequest,
    'server-error': serverError,
    'not-found': notFound,
    unauthorized,
    forbidden,
    success
  }
}
