import Order from '../../../../../db/models/Order'

async function orders(_, args, { user }) {
  return await Order.find({ user: user.userId })
}

export default orders
