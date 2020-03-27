import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  date: { type: Date, default: new Date() },
  paymentType: String,
  paymentStatus: String,
  isOrderCompleted: { type: Boolean, default: false },
})

const Order = mongoose.model('Order', orderSchema)

export default Order
