import User from '../../../../db/models/User'

const Cart = {
	user: async cart => await User.findById(cart.user),
}

export default Cart
