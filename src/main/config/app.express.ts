import express from 'express'
import { setupMiddlewares } from './middlewares.express'
import { setupRoutes } from './routes.express'

const app = express()

setupMiddlewares(app)
void setupRoutes(app)

export { app }
