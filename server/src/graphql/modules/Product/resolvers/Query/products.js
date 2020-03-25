import Product from '../../../../../db/models/Product'

async function products() {
  return await Product.find({}).sort({ lastUpdated: -1 })
}

export default products
