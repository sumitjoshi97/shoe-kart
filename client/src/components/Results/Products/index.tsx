import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import * as queries from '../queries'
import {
  ProductsStateContext,
  ProductsDispatchContext,
} from '../products-context'
import ProductCard from './ProductCard'
import { IProduct } from '../interface'

const Products: React.FC = () => {
  const { state } = useContext(ProductsStateContext)
  const { dispatch } = useContext(ProductsDispatchContext)
  const { data } = useQuery(queries.getAllProducts)

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'SET_PRODUCTS',
        products: data.products,
      })
    }
  }, [data])

  const renderProducts = (products: IProduct[], category: string) => {
    let tempProducts = products

    if (category && category !== '') {
      tempProducts = products.filter(
        (product: IProduct) => product.category === category,
      )
    }

    return tempProducts.map((product: any) => {
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
      {renderProducts(state.products, state.activeCategory)}
    </div>
  )
}

export default Products
