import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import User from '../../../db/models/User'

async function signup(parent, args, context) {
  const user = await User.findOne({ email: args.email })
  if (!user) {
    const _id = new mongoose.Types.ObjectId()
    const password = await bcrypt.hash(args.password, 10)
    const user = new User({ _id, ...args, password })
    await user.save()

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)

    return {
      token,
      user
    }
  }
  else {
    throw new Error('user exists')
  }
}

async function login(parent, args, context) {
  const user = await User.findOne({ email: args.email })

  if (!user) {
    throw new Error('no such user')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('invalid password')
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)

  return {
    token,
    user
  }
}

export {
  signup,
  login
}