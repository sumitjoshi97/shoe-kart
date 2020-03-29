import Order from '../../../../../db/models/Order'

async function order(_, args, { user }) {
  const orders = await Order.find({ user: user.userId })
  const order = orders.find(order => order._id.toString() === args.orderId)

  return order
}

export default order
