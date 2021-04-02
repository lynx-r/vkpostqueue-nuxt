import { ServerResponse } from 'http'

export class MiddlewareResponse {
  // eslint-disable-next-line no-useless-constructor
  constructor (public status: 'success' | 'fail', public payload?: any, public message?: string) {
  }

  toString () {
    return JSON.stringify(this, (_, v) => v ?? undefined)
  }

  static payloadSuccess (payload?: any, message?: string) {
    return new MiddlewareResponse('success', payload, message)
  }

  static payloadSuccessAsString (payload?: any, message?: string) {
    return new MiddlewareResponse('success', payload, message).toString()
  }

  static payloadFail (payload?: any, message?: string) {
    return new MiddlewareResponse('fail', payload, message)
  }

  static payloadFailAsString (payload?: any, message?: string) {
    return new MiddlewareResponse('fail', payload, message).toString()
  }

  static failBadRequest (res: ServerResponse, payload?: any, message?: string) {
    res.statusCode = 400
    res.end(MiddlewareResponse.payloadFailAsString(payload, message))
  }

  static failMethodNotAllowed (res: ServerResponse) {
    res.statusCode = 405
    res.end(MiddlewareResponse.payloadFailAsString(null, 'Method Not Allowed'))
  }
}
