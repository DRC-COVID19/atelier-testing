import { index } from '../../../Controllers/users'
import { FakExpress } from '../../utils/FakeExpress'
import { expect, jest, beforeAll, describe, it } from '@jest/globals'
import { User } from '../../../models/user'
import faker from 'faker'

describe('Users controller test index method', () => {
  const users = []
  beforeAll(() => {
    for (let i = 0; i < 10; i++) {
      users.push({
        _id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        birthDay: faker.date.past(),
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber()
      })
    }
    User.find = jest.fn().mockImplementation((callback) => {
      callback(null, users)
    })
  })
  it('should be list ', () => {
    const exp = new FakExpress()
    index(null, exp.res)
    expect(exp.responseData).toEqual(users)
  })
})
