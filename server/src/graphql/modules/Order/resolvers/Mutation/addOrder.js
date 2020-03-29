import Order from '../../../../../db/models/Order'

async function addOrder(_, args, { user }) {
  try {
    const {
      items,
      address,
      paymentType,
      paymentStatus,
      isOrderCompleted,
    } = args
    const newOrder = new Order({
      user: user.userId,
      items,
      address,
      paymentType,
      paymentStatus,
      isOrderCompleted,
    })

    await newOrder.save()
    return newOrder
  } catch (err) {
    throw new Error('cant create order, check credentials')
  }
}

export default addOrder
