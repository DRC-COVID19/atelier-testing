import { User } from '../models/user'
/**
 *
 * @param {Request} _
 * @param {Response} res
 */
export const index = (_, res) => {
  try {
    User.find((error, users) => {
      if (error) {
        return res.status(400).json(error)
      }
      return res.json(users)
    })
  } catch (error) {
    return res.status(500).json(error)
  }
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {User} user
 */
export const store = async (req, res, user) => {
  try {
    const newUser = await user.create({
      firstName: req.body.firstName,
      userName: req.body.userName,
      email: req.body.email
    })
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json(error)
  }
}
