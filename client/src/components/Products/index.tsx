import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import * as queries from './queries'
import ProductItem from './ProductItem'
import './styles.scss'

const Products = () => {
  const { loading, error, data } = useQuery(queries.getAllProducts)
  if (loading) console.log('loading')
  if (error) console.log('error')

  let products = []

  if (data) {
    products = data.products.map((product: any) => {
      const { _id, name, image, price } = product
      return (
        <ProductItem
          key={_id}
          id={_id}
          name={name}
          image={image[0]}
          price={price}
        />
      )
    })
  }

  return <div className="products">{products}</div>
}

export default Products
