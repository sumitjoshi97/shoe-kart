import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	items: [
		{
			product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
			quantity: { type: Number, default: 1 },
			selectedSize: { type: Number, required: true },
		},
	],
	date: { type: Date, default: new Date() },
})

const Order = mongoose.model('Order', orderSchema)

export default Order
