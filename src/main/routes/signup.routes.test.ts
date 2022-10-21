import request from 'supertest'
import { mongoHelper } from '../../infra/db/mongodb/helpers/mongo.helper'
import { app } from '../config/app.express'
import { routes } from './const'

const { buildApiPath, account: { signup } } = routes

describe('signup routes', () => {
  beforeEach(async () => {
    jest.restoreAllMocks()
    await mongoHelper.getCollection('accounts').deleteMany({})
  })

  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

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
