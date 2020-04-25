import React, { useEffect, ReactNodeArray } from 'react'
import { useQuery } from '@apollo/react-hooks'
import * as queries from '../queries'
import { useProductState, useProductDispatch } from '../products-context'
import ProductCard from './ProductCard'
import { IProduct } from '../interface'

interface IActiveFilters {
  gender: string[]
  color: string[]
  size: number[]
  [key: string]: (string | number)[]
}

const Products: React.FC = () => {
  const { state } = useProductState()
  const { dispatch } = useProductDispatch()
  const { data } = useQuery(queries.getAllProducts)

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'SET_PRODUCTS',
        products: data.products,
      })
    }
  }, [data])

  const renderProducts = (
    products: IProduct[],
    category: string,
    filters: IActiveFilters,
  ) => {
    let tempProducts: IProduct[] = products
    if (category && category !== '') {
      tempProducts = products.filter(
        (product: IProduct) => product.category === category,
      )
    }

    if (
      filters &&
      Object.keys(filters).length > 0 &&
      (filters.gender.length > 0 ||
        filters.color.length > 0 ||
        filters.size.length > 0)
    ) {
      for (let filterType in filters) {
        if (filters[filterType].length > 0) {
          tempProducts = tempProducts.filter((product: IProduct) =>
            filters[filterType].find((filter: string | number) => {
              if (Array.isArray(product[filterType])) {
                return (product[filterType] as ReactNodeArray).find(option => {
                  return option === filter
                })
              } else {
                return filter === product[filterType]
              }
            }),
          )
        }
      }
    }

    return tempProducts.map((product: IProduct) => {
      const { _id, name, image, price } = product
      return (
        <ProductCard
          key={_id}
          id={_id}
          name={name}
          image={image[0]}
          price={price}
        />
      )
    })
  }

  return (
    <div className="products">
      {renderProducts(
        state.products,
        state.activeCategory,
        state.activeFilters,
      )}
    </div>
  )
}

export default Products
