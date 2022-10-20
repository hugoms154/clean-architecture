import express from 'express'
import { setupMiddlewares } from './middlewares.express'

const app = express()

setupMiddlewares(app)

export { app }
