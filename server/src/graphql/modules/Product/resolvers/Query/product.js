import Product from "../../../../../db/models/Product";

const product = (_, args) => {
  return Product.findById(args._id)
}

export default product