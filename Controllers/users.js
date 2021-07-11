import { Error as MongooseError } from 'mongoose'
import { User } from '../models/user'
/**
 *
 * @param {Request} _
 * @param {Response} res
 */
export const index = async (_, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(400).json(error.message)
      return
    }
    res.status(500).json(error.message)
  }
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {User} user
 */
export const store = async (req, res) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      userName: req.body.userName,
      email: req.body.email
    })
    res.status(201).json(newUser)
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(400).json(error.message)
      return
    }
    res.status(500).json(error.message)
  }
}
