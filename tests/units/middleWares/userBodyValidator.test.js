import { expect, jest, describe, it } from '@jest/globals'
import { userBodyValidator, userNameExist, UserNameErrorRequired, firstNameErrorRequired } from '../../../middleWares/userBodyValidator'
import { FakExpress } from '../../utils/FakeExpress'
import { User } from '../../../models/user'

describe('test middleWare userBodyValidator', () => {
  it('should be undefined ', async () => {
    const exp = new FakExpress({})
    const next = jest.fn()
    await userBodyValidator(exp.req, exp.res, next)
    expect(exp.req.validatorError).toBeUndefined()
    expect(next.mock.calls.length).toBe(1)
  })
  it('required fields ', async () => {
    const exp = new FakExpress({
      body: {}
    })
    const next = jest.fn()
    await userBodyValidator(exp.req, exp.res, next)
    expect(exp.req.validatorError).toBeDefined()
    expect(next).toHaveBeenCalledTimes(1)
    expect(exp.req.validatorError).toEqual({ firstName: firstNameErrorRequired, userName: UserNameErrorRequired })
  })

  it('userName already exist ', async () => {
    const exp = new FakExpress({
      body: {
        firstName: 'Merveille',
        userName: 'merki230'
      }
    })
    User.findOne = jest.fn().mockResolvedValue({})
    const next = jest.fn()
    await userBodyValidator(exp.req, exp.res, next)
    expect(exp.req.validatorError).toBeDefined()
    expect(next).toHaveBeenCalledTimes(1)
    expect(exp.req.validatorError).toEqual({ userName: userNameExist })
  })
})
