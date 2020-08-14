import Category from '../../../../../db/models/Category'

async function addCategory(_, { name, parent, ancestors }) {
	try {
		const category = await Category.findOne({ name })
		if (category) throw new Error('category already exists, try another name')

		const newCategory = await new Category({
			name,
			parent,
			ancestors,
		}).save()
		console.log('category', newCategory)
		return newCategory
	} catch (err) {
		throw new Error('can"t add category, try again')
	}
}

export default addCategory
