import { Router } from 'express'
import { index, store } from '../Controllers/users'
import { User } from '../models/user'
import { body, validationResult } from 'express-validator'

const router = Router()

/* GET users listing. */
router.get('/', index)

router.post('/',
  body('firstName')
    .exists()
    .withMessage('firstName is required'),
  body('email')
    .isEmail()
    .withMessage('email not valid'),
  body('userName').custom((value) => {
    return User.findOne({ userName: value }).then(user => {
      if (user) {
        return Promise.reject(new Error('userName already in use'))
      }
    })
  }),
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    store(req, res, User)
  })

export default router
