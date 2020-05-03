import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

import { encodeToken } from '../../../../../utils/token'
import User from '../../../../../db/models/User'

async function signup(_, args) {
	const user = await User.findOne({ email: args.email })
	if (!user) {
		const _id = new mongoose.Types.ObjectId()
		const password = await bcrypt.hash(args.password, 10)
		const user = new User({ _id, ...args, password })
		await user.save()

		const token = encodeToken(user._id)

		return {
			token,
			user,
		}
	} else {
		throw new Error('user exists')
	}
}

export default signup
