import { model, Schema } from 'mongoose'

const productSchema = new Schema({
  name: { type: String, required: true },
  image: [{ type: String, required: true }],
  category: { type: String, required: true },
  size: [{ type: Number }],
  color: [{ type: String }],
  gender: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
})

const Product = model('Product', productSchema)

export default Product