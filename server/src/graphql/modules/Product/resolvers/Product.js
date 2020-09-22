import Category from '../../../../db/models/Category'

const Product = {
	mainCategory: async product => {
		return await Category.findById(product.mainCategory)
	},
	categories: async product => {
		return await product.categories.map(category => Category.findById(category))
	},
}

export default Product
