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

async function products(_, { mainCategory, categories, sortBy }) {
	// main-category = false | category = false | sortBy = false
	if (!mainCategory && !categories && !sortBy) {
		return await Product.find().sort({ lastUpdated: -1 })
	}

	// main-category = false | category = false | sortBy = true - (priceDesc/priceAsc)
	if (!mainCategory && !categories && sortBy) {
		if (sortBy === 'priceDesc') {
			return await Product.find().sort({ price: -1 })
		}
		return await Product.find().sort({ price: 1 })
	}

	// main-category = true | category = false | sortBy = false
	if (mainCategory && !categories && !sortBy) {
		return await Product.find({ mainCategory }).sort({ lastUpdated: -1 })
	}

	// main-category = true | category = false | sortBy = true - (priceDesc/priceAsc)
	if (mainCategory && !categories && sortBy) {
		if (sortBy === 'priceDesc') {
			return await Product.find({ mainCategory }).sort({ price: -1 })
		}
		return await Product.find({ mainCategory }).sort({ price: 1 })
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

		// main-category = true | category = true | sortBy = false
		if (mainCategory && !sortBy) {
			return Product.find({ mainCategory, $and: productsFilter.$and }).sort({
				lastUpdated: -1,
			})
		}

		// main-category = true | category = true | sortBy = true - (priceDesc/priceAsc)
		if (mainCategory && sortBy) {
			if (sortBy === 'priceDesc') {
				return await Product.find({
					mainCategory,
					$and: productsFilter.$and,
				}).sort({ price: -1 })
			}

			return await Product.find({
				mainCategory,
				$and: productsFilter.$and,
			}).sort({ price: 1 })
		}

		// main-category = false | category = true | sortBy = true - (priceDesc/priceAsc)
		if (!mainCategory && sortBy) {
			if (sortBy === 'priceDesc') {
				return await Product.find(productsFilter).sort({ price: -1 })
			}
			return await Product.find(productsFilter).sort({ price: 1 })
		}

		// main-category = false | category = true | sortBy = false
		return await Product.find(productsFilter).sort({ lastUpdated: -1 })
	}
}

export default products
