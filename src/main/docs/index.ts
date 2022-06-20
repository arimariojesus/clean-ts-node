import { loginPath } from './paths/login-path'
import { accountSchema } from './schemas/account-schema'
import { loginParamsSchema } from './schemas/login-params-schema'

export default {
  openapi: '3.0.3',
  info: {
    title: 'Clean Node API',
    description: 'API para realização de enquetes entre programadores',
    version: '1.0.0',
    author: 'Arimário Jesus <arimario.jesus@hotmail.com> (https://github.com/arimariojesus)',
    termsOfService: '#'
  },
  servers: [{
    url: '/api',
    description: 'Servidor local'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    'login-params': loginParamsSchema
  }
}
