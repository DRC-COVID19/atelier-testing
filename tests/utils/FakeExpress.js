import { jest } from '@jest/globals'

export class FakExpress {
  constructor (req) {
    this.req = req
    this.responseData = {}
    this.res = {
      statusCode: 200,
      status: jest.fn().mockImplementation((code) => {
        this.res.statusCode = code
        return this.res
      }),
      json: jest.fn().mockImplementation((param) => {
        this.responseData = param
        return this.res
      }),
      cookie: jest.fn(),
      clearCookie: jest.fn()
    }
  }
}
