import { HttpRequest, HttpResponse } from '../protocols/http.protocol'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body?.name) {
      return {
        statusCode: 400,
        body: new Error('Missing parma: name')
      }
    }

    if (!httpRequest.body?.email) {
      return {
        statusCode: 400,
        body: new Error('Missing parma: email')
      }
    }
  }
}
