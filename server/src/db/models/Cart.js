import mongoose, { model, Schema } from 'mongoose'

const cartSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1, min: 1, max: 10},
      selectedSize: { type: Number, required: true },
    },
  ],
})

const Cart = model('Cart', cartSchema)

export default Cart
