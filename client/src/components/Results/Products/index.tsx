import React, { ReactNodeArray, useRef } from 'react'
import ProductCard from './ProductCard'
import { IProduct } from '../interface'
import useResize from '../hooks/useResize'

const Products: React.FC<any> = ({ results, resultsStore }) => {
  const productsRef = useRef<HTMLDivElement>(null)
  const { length } = useResize(productsRef)

  const getProducts = () => {
    const { activeCategory, activeFilters, sortBy } = resultsStore
    let products: IProduct[] = []

    if (results) {
      products = results.products
    }

    if (activeCategory && activeCategory !== '') {
      products = products.filter(
        (product: IProduct) => product.category === activeCategory,
      )
    }

    if (
      activeFilters &&
      Object.keys(activeFilters).length > 0 &&
      (activeFilters.gender.length > 0 ||
        activeFilters.color.length > 0 ||
        activeFilters.size.length > 0)
    ) {
      for (let filterType in activeFilters) {
        if (activeFilters[filterType].length > 0) {
          products = products.filter((product: IProduct) =>
            activeFilters[filterType].find((filter: string | number) => {
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
    if (!sortBy.hasOwnProperty('title') || sortBy.value === '') {
      return products
    }

    if (sortBy.value === 'priceAsc') {
      const tempProducts = [...products]
      return tempProducts.sort(
        (product1: IProduct, product2: IProduct) =>
          parseInt(product1.price) - parseInt(product2.price),
      )
    }
    if (sortBy.value === 'priceDesc') {
      const tempProducts = [...products]
      return tempProducts.sort(
        (product1: IProduct, product2: IProduct) =>
          parseInt(product2.price) - parseInt(product1.price),
      )
    }
  }

  const renderProducts = () => {
    const products: IProduct[] | undefined = getProducts()
    if (typeof products === 'undefined') return

    return products.map((product: IProduct) => {
      const { _id, name, image, category, gender, price } = product
      return (
        <ProductCard
          key={_id}
          id={_id}
          name={name}
          category={category}
          gender={gender}
          image={image[0]}
          price={price}
          length={length || productsRef.current?.offsetWidth}
        />
      )
    })
  }

  return (
    <div className="products" ref={productsRef}>
      {renderProducts()}
    </div>
  )
}

export default Products
