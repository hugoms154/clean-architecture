import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser.middleware'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
}
