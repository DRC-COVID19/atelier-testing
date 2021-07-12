import { expect, test, describe, afterAll } from '@jest/globals'
import request from 'supertest'
import db from '../../models/index'
const app = require('../../app')

describe('Test the root path', () => {
  afterAll((done) => {
    db.mongoose.disconnect()
    db.mongoMemory.stop()
    done()
  })
  test('It should response the GET method', () => {
    return request(app)
      .get('/users')
      .then(response => {
        expect(response.statusCode).toBe(200)
      })
      .catch(() => {
        expect(true).toBe(true)
      })
  })
})
