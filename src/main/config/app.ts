import express, { Express } from 'express'

import { setupApolloServer } from './apollo-server'
import setupStaticFiles from './static-files'
import setupMiddlewares from './middlewares'
import setupSwagger from './swagger'
import setupRoutes from './routes'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupStaticFiles(app)
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  const server = setupApolloServer()
  await server.start()
  server.applyMiddleware({ app })
  return app
}
