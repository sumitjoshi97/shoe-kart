import Product from "../../../../../db/models/Product";

async function product(_, args) {
  return await Product.findById(args._id)
}

export default product