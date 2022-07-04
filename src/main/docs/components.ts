import { apiKeyAuthSchema } from './schemas/'
import {
  badRequest,
  serverError,
  notFound,
  success,
  forbidden,
  unauthorized
} from './components/'

export default {
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
