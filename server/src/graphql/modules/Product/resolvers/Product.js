import Category from '../../../../db/models/Category'

const Product = {
	main_category: async product => {
		return await Category.findById(product.main_category)
	},
	categories: async product => {
		return await product.categories.map(category => Category.findById(category))
	},
}

export default Product
