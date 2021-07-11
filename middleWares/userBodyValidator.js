import { User } from '../models/user'
export const UserNameErrorRequired = {
  message: 'userName is required',
  param: 'userName'

}
export const userNameExist = {
  message: 'userName is already in use',
  param: 'userName'

}
export const firstNameErrorRequired = {
  message: 'firstName is required',
  param: 'firstName'
}
export const userBodyValidator = async (req, res, next) => {
  if (!req.body) {
    next()
    return
  }
  const validatorError = {}

  if (!req.body.firstName) {
    validatorError.firstName = firstNameErrorRequired
  }

  if (req.body.userName) {
    const user = await User.findOne({ userName: req.body.userName })
    if (user) {
      validatorError.userName = userNameExist
    }
  } else {
    validatorError.userName = UserNameErrorRequired
  }

  if (Object.getOwnPropertyNames(validatorError).length > 0) {
    req.validatorError = validatorError
  }
  next()
}
