import Product from '../../../../../db/models/Product'

const products = () => {
  return Product.find({}).sort({ lastUpdated: -1 })
}

export default products