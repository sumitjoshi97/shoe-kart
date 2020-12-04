import React, { useEffect, useRef, useState } from 'react'

import Loading from '~components/shared/Loading'
import ProductCard from './ProductCard'

import useProducts from '~hooks/products/useProducts'
import useResize from '~hooks/useResize'

import isEmpty from '~helpers/isEmpty'
import { IProduct } from '~interface'

const BREAKPOINT = 768

const Products = () => {
  const { products, productsLoading } = useProducts()

  const productsRef = useRef<HTMLDivElement>(null)
  const { length } = useResize(productsRef)

  const [cardWidth, setCardWidth] = useState<number>(0)

  useEffect(() => {
    if (length <= BREAKPOINT) {
      setCardWidth(Math.floor(length / 2))
    } else {
      setCardWidth(Math.floor(length / 3))
    }
  }, [length])

  const renderProducts = () => {
    if (productsLoading) return <Loading />

    if (isEmpty(products)) {
      return (
        <h3 style={{ textAlign: 'center' }}>Sorry, there are no products</h3>
      )
    }

    return products.map((product: IProduct) => {
      const { _id, name, image, mainCategory, categories, price } = product
      return (
        <ProductCard
          key={_id}
          _id={_id}
          name={name}
          image={image}
          mainCategory={mainCategory}
          categories={categories}
          price={price}
          width={cardWidth}
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
