import { Router } from 'express'
import { index, store } from '../Controllers/users'
import { userBodyValidator } from '../middleWares/userBodyValidator'

const router = Router()

/* GET users listing. */
router.get('/', index)

router.post('/', userBodyValidator,
  (req, res) => {
    if (req.validatorError) {
      return res.status(422).json({ errors: req.validatorError })
    }
    store(req, res)
  })

export default router
