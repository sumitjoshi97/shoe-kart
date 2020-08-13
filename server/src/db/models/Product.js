import { model, Schema } from 'mongoose'

const productSchema = new Schema({
	name: { type: String, required: true },
	image: [{ type: String, required: true }],
	main_category: {
		type: mongoose.Schema.Types.ObjectID,
		ref: 'Category',
		required: true,
	},
	categories: [
		{
			type: mongoose.Schema.Types.ObjectID,
			ref: 'Category',
			required: true,
		},
	],
	description: { type: String, required: true },
	price: { type: Number, required: true },
})

const Product = model('Product', productSchema)

export default Product
