import Category from '../../../../../db/models/Category'

async function categories() {
	try {
		const categories = await Category.find({})
		return categories
	} catch (err) {
		throw new Error('no categories found')
	}
}

export default categories
