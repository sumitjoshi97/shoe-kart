import bcrypt from 'bcrypt'

import { encodeToken } from '../../../../../utils/token'
import User from '../../../../../db/models/User'

async function login(_, args) {
	const user = await User.findOne({ email: args.email })

	if (!user) {
		throw new Error('wrong credentials')
	}

	const validPassword = await bcrypt.compare(
		args.password,
		user.password
	)
	if (!validPassword) {
		throw new Error('wrong credentials')
	}

	const token = encodeToken(user._id)

	return {
		token,
		user,
	}
}

export default login
