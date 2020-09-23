import Order from '../../../../../db/models/Order'

async function order(_, args) {
	return await Order.findById(args.orderId)
}

export default order
