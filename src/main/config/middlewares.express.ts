import { Express } from 'express'
import { bodyParser, cors } from '../middlewares'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
