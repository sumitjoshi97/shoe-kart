import Product from "../../../../../db/models/Product";
import mongoose from "mongoose";

const addProduct = (context, args) => {
  const _id = new mongoose.Types.ObjectId()
  const product = new Product({ ...args, _id })
  product.save()

  return product
}

export default addProduct