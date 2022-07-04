import paths from './paths'
import components from './components'
import schemas from './schemas'

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
  paths,
  schemas,
  components
}
