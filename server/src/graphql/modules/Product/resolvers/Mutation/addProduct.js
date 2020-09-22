import Product from '../../../../../db/models/Product'

async function addProduct(_, args) {
	try {
		return await new Product(args).save()
	} catch {
		throw new Error("can't add new product try again")
	}
}

export default addProduct
