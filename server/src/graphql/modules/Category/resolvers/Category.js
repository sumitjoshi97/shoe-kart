import Category from '../../../../db/models/Category'

const CategoryResolver = {
	parent: async category => {
		return await Category.findById(category.parent)
	},
	ancestors: async category => {
		return await category.ancestors.map(ancestor => Category.findById(ancestor))
	},
}

export default CategoryResolver
