import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../../presentation/protocols'

export const adaptRoute = (controller: Controller): (req: Request, res: Response) => void =>
  (req: Request, res: Response): void => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    controller.handle(httpRequest)
      .then((httpResponse) => {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      })
      .catch(console.error)
  }
