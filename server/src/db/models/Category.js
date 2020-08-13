import mongoose, { model, Schema } from 'mongoose'

const categorySchema = new Schema({
	name: { type: String, required: true },
	parent: { type: mongoose.Schema.Types.ObjectID, ref: 'Category' },
	ancestors: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Category' }],
})

const Category = model('Category', categorySchema)

export default Category
