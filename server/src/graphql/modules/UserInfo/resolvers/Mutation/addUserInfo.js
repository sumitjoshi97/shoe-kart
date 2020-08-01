import UserInfo from '../../../../../db/models/UserInfo'

async function addUserInfo(_, { address }, { user }) {
	try {
		const isUserInfo = UserInfo.findOne({ user: user.userId })
		if (isUserInfo) {
			throw new Error('address is added for current user')
		}

		const { street, locality, city, state, landmark, contactNumber } = address
		const userInfo = new UserInfo({
			user: user.userId,
			address: {
				street,
				locality,
				city,
				state,
				landmark,
				contactNumber: parseInt(contactNumber),
			},
		})
		return await userInfo.save()
	} catch (err) {
		throw new Error(err)
	}
}

export default addUserInfo
