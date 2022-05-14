import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-controller-factory'

export const auth = adaptMiddleware(makeAuthMiddleware())
