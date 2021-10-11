import express from 'express'
import dogs from '../controllers/dogs.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'


const router = express.Router()

router.route('/dogs')
  .get(dogs.index)
  .post(secureRoute, dogs.create)

router.route('/dogs/:dogId')
  .get(dogs.show)
  .post(secureRoute, dogs.create)
  .put(secureRoute, dogs.update)
  .delete(secureRoute, dogs.delete)

router.route('/dogs/:dogId/comments')
  .post(secureRoute, dogs.commentCreate)

router.route('/dogs/:dogId/comments/:commentId')
  .delete(secureRoute, dogs.commentDelete)

router.route('/dogs/:dogId/favourite')
  .post(secureRoute, dogs.favourite)


router.post('/register', auth.register)
router.post('/login', auth.login)

router.route('/profile')
  .get(secureRoute, auth.profile)

export default router
  