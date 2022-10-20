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

  test('should return xml content type when forced', async () => {
    const route = '/test_content-type_xml'
    app.get(route, (_, res) => {
      res.type('xml')
      res.send()
    })

    await request(app)
      .get(route)
      .expect('content-type', /xml/)
  })
})
