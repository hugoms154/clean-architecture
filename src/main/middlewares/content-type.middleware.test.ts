import request from 'supertest'
import { app } from '../config/app.express'

describe('content type middleware', () => {
  test('should return default content type as json', async () => {
    const route = '/test_content-type_json'
    app.get(route, (_, res) => {
      res.send()
    })

    await request(app)
      .get(route)
      .expect('content-type', /json/)
  })
})
