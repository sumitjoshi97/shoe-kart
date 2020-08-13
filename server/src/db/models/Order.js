import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
	date: { type: Date, default: new Date() },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	items: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product',
				required: true,
			},
			quantity: { type: Number, default: 1 },
			selectedSize: { type: mongoose.Schema.Types.ObjectId, required: true },
		},
	],
})

const Order = mongoose.model('Order', orderSchema)

export default Order
