import { useQuery } from 'react-apollo'
import { ICategory, ICategoryTreeItem } from '~interface'
import { fetchCategoriesQuery } from './queries'

const useCategory = () => {
  const { loading: categoriesLoading, data: categoriesData } = useQuery(
    fetchCategoriesQuery,
  )

  let categories: ICategoryTreeItem[] = []

  if (categoriesData) {
    const rootCategory = categoriesData.categories.find(
      (category: ICategory) => category.parent === null,
    )

    categoriesData.categories.forEach((category: ICategory) => {
      if (category.parent && category.parent._id === rootCategory._id)
        categories.push(category)
    })

    for (let i = 0; i < categories.length; i++) {
      categories[i].items = []
      categoriesData.categories.forEach((category: ICategory) => {
        if (category.parent && category.parent._id === categories[i]._id) {
          categories[i].items?.push(category)
        }
      })
    }
  }

  return {
    categories,
    categoriesLoading,
  }
}

export default useCategory
