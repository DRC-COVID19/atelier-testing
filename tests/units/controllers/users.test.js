import { index, store } from '../../../Controllers/users'
import { FakExpress } from '../../utils/FakeExpress'
import { expect, jest, beforeAll, describe, it } from '@jest/globals'
import { User } from '../../../models/user'
import faker from 'faker'
import { Error as MongooseError } from 'mongoose'

describe('Users controller test index method', () => {
  const users = []
  beforeAll(() => {
    for (let i = 0; i < 10; i++) {
      users.push({
        _id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        userName: faker.internet.userName(),
        email: faker.internet.email()
      })
    }
  })
  it('should be list ', async () => {
    const exp = new FakExpress()
    User.find = jest.fn().mockImplementation(() => {
      return Promise.resolve(users)
    })
    await index(null, exp.res)
    expect(exp.responseData).toEqual(users)
  })

  it('should be error 400', async () => {
    const exp = new FakExpress()
    const error400 = new MongooseError('should be error 400')
    User.find = jest.fn()
      .mockImplementation(() => {
        return Promise.reject(error400)
      })
    await index(null, exp.res)
    expect(exp.res.statusCode).toEqual(400)
    expect(exp.responseData).toEqual(error400.message)
  })

  it('should be error 500', async () => {
    const exp = new FakExpress()
    const error500 = new Error('should be error 500')
    User.find = jest.fn()
      .mockImplementation(() => {
        return Promise.reject(error500)
      })
    await index(null, exp.res)
    expect(exp.res.statusCode).toEqual(500)
    expect(exp.responseData).toEqual(error500.message)
  })
})

describe('Users controller test store method', () => {
  it('should ', async () => {
    const body = {
      firstName: faker.name.firstName(),
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      _id: '60eac47b2d84e736dcffdec4'
    }
    const exp = new FakExpress({
      body
    })

    User.create = jest.fn().mockImplementation(({ firstName, userName, email }) => {
      return Promise.resolve(new User({
        _id: body.id,
        firstName,
        userName,
        email
      }))
    })

    await store(exp.req, exp.res)
    expect(exp.responseData._id).toBeDefined()
    expect(exp.responseData.email).toEqual(body.email)
    expect(exp.responseData.firstName).toEqual(body.firstName)
    expect(exp.responseData.userName).toEqual(body.userName)
  })

  it('should be error 400', async () => {
    const body = {
      firstName: faker.name.firstName(),
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      _id: '60eac47b2d84e736dcffdec4'
    }
    const exp = new FakExpress({
      body
    })
    const error400 = new MongooseError('should be error 400')
    User.create = jest.fn()
      .mockImplementation(() => {
        return Promise.reject(error400)
      })
    await store(exp.req, exp.res)
    expect(exp.res.statusCode).toEqual(400)
    expect(exp.responseData).toEqual(error400.message)
  })

  it('should be error 500', async () => {
    const body = {
      firstName: faker.name.firstName(),
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      _id: '60eac47b2d84e736dcffdec4'
    }
    const exp = new FakExpress({
      body
    })
    const error500 = new Error('should be error 500')
    User.create = jest.fn()
      .mockImplementation(() => {
        return Promise.reject(error500)
      })
    await store(exp.req, exp.res)
    expect(exp.res.statusCode).toEqual(500)
    expect(exp.responseData).toEqual(error500.message)
  })
})
