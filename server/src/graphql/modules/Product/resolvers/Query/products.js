import Product from '../../../../../db/models/Product'
import Category from '../../../../../db/models/Category'

async function getFilterCategories(categories) {
	const paramCategories = await Category.find({
		_id: {
			$in: categories,
		},
	})

	const parentCategory = await Category.findOne({ parent: null })
	const mainCategories = await Category.find({ parent: parentCategory._id })
	const filterCategories = []

	mainCategories.forEach(mainCategory => {
		const categories = []
		paramCategories.forEach(category => {
			if (category.parent.equals(mainCategory._id)) {
				categories.push(category._id)
			}
		})
		if (categories.length > 0) {
			filterCategories.push(categories)
		}
	})

	return filterCategories
}

async function products(_, { main_category, categories }) {
	if (!main_category && !categories) {
		return await Product.find().sort({ lastUpdated: -1 })
	}

	if (main_category && !categories) {
		return await Product.find({ main_category }).sort({ lastUpdated: -1 })
	}

	if (categories) {
		const filterCategories = await getFilterCategories(categories)
		const productsFilter = {
			$and: filterCategories.map(subCategory => {
				return {
					$or: subCategory.map(category => {
						return {
							categories: category,
						}
					}),
				}
			}),
		}

		if (main_category) {
			return Product.find({ main_category, $and: productsFilter.$and })
		}

		return Product.find(productsFilter)
	}
}

export default products
