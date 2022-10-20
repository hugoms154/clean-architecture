import request from 'supertest'
import { app } from '../config/app.express'

describe('cors middleware', () => {
  test('should enable cors', async () => {
    const route = '/test_cors'
    app.get(route, (_, res) => {
      res.send()
    })

    await request(app)
      .get(route)
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
