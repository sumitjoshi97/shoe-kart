import Product from '../../../../../db/models/Product'

async function product(_, args) {
	return await Product.findById(args.productId)
}

export default product
