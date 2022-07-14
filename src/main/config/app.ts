import express from 'express'
import setupStaticFiles from './static-files'
import setupMiddlewares from './middlewares'
import setupSwagger from './config-swagger'
import setupRoutes from './routes'

const app = express()
setupStaticFiles(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)

export default app
