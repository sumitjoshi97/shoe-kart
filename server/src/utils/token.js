import { sign, verify } from 'jsonwebtoken'

import User from '../db/models/User'

//create jwt token from - user.id + user.role
async function encodeToken(userId) {
  try {
    const user = User.findById({ userId })
    const role = user.isAdmin ? 'ADMIN' : 'USER'
    const token = sign({ userId, role }, process.env.JWT_SECRET)
    return token
  }
  catch (err) {
    throw new Error(err)
  }
}

//decode given jwt token to get user.id + role
async function decodeToken(token) {
  try {
    const { userId, role } = verify(token, process.env.JWT_SECRET)

    return { userId, role }
  }
  catch (err) {
    throw new Error('wrong token')
  }
}

export { encodeToken, decodeToken }