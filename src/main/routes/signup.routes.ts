import { Router } from 'express'
import { makeSignUpController } from '../factories/signup.factory'
import { adaptRoute } from './adapters/router.express.adapter'
import { routes } from './const'

export default (router: Router): void => {
  router.post(routes.account.signup, adaptRoute(makeSignUpController()))
}
