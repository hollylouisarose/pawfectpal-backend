import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import User from '../models/user.js'
import { Unauthorized } from './errors.js'

export default async function secureRoute(req, _res, next) {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
      throw new Unauthorized()
    }

    const token = req.headers.authorization.replace('Bearer ', '')

    const payload = jwt.verify(token, secret)

    const user = await User.findById(payload.sub)

    if (!user) {
      throw new Unauthorized()
    }

    // these two values can now be used in any secure route
    // deconstructed as const { currentUser }
    // use id when checking for permissions
    // use object when trying to add it to things
    req.currentUser = user
    req.currentUserId = user._id
  
    next()
  } catch (err) {
    next(err)
  }
}