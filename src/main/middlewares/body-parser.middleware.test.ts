import request from 'supertest'
import { app } from '../config/app.express'

describe('body-parser middleware', () => {
  test('should parse body as json', async () => {
    const route = '/test_body_parser'
    const body = { name: 'name' }
    app.post(route, (req, res) => {
      res.send(req.body)
    })

    await request(app).post(route).send(body).expect(body)
  })
})
