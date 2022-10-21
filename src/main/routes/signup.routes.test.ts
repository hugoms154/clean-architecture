import request from 'supertest'
import { app } from '../config/app.express'
import { routes } from './const'

const { buildApiPath, account: { signup } } = routes

describe('signup routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post(buildApiPath(signup))
      .send({
        name: 'valid name',
        email: 'valid@email.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      })
      .expect(200)
      .expect({ ok: 'ok' })
  })
})
