import User from '../../../../db/models/User'
import UserInfo from '../../../../db/models/UserInfo'

const Order = {
	user: async order => {
		const user = await User.findById(order.user)
		return user
	},

	userInfo: async order => {
		const userInfo = await UserInfo.findOne({ user: order.user })
		return userInfo
	},
}

export default Order
