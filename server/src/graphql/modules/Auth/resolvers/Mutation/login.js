import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { encodeToken } from '../../../../../utils/token'
import User from '../../../../../db/models/User'

async function login(parent, args, context) {
  const user = await User.findOne({ email: args.email })

  if (!user) {
    throw new Error('wrong credentials')
  }

  const validPassword = await bcrypt.compare(args.password, user.password)
  if (!validPassword) {
    throw new Error('wrong credentials')
  }

  const token = encodeToken(user._id)

  return {
    token,
    user
  }
}

export default login