import Product from "../../../../../db/models/Product";

const removeProduct = (context, args) => {
  const product = Product.remove({ _id: args._id })
  return product
}

export default removeProduct