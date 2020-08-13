import mongoose, { model, Schema } from 'mongoose'

const cartSchema = new Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	price: { type: Number, required: true, min: 0, default: 0 },
	quantity: { type: Number, required: true, min: 0, default: 0 },
	items: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true,
			},
			quantity: { type: Number, default: 1, min: 1, max: 10 },
			selectedSize: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
			},
		},
	],
})

const Cart = model('Cart', cartSchema)

export default Cart
