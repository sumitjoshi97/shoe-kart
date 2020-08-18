import Order from '../../../../../db/models/Order'

async function orders(_, __, { user }) {
  return await Order.find({ user: user.userId })
}

export default orders
