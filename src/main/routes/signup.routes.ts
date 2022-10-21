import { Router } from 'express'
import { routes } from './const'

export default (router: Router): void => {
  router.post(routes.account.signup, (_, res) => {
    res.send({ ok: 'ok' })
  })
}
