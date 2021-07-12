import { expect, test, describe } from '@jest/globals'
import app from '../../app'
import request from 'supertest'

describe('Test the root path', () => {
  test('It should response the GET method', done => {
    request(app)
      .get('/users')
      .then(response => {
        expect(response.statusCode).toBe(200)
        done()
      })
      .catch(error => {
        console.log(error)
        done()
      })
  })
})
