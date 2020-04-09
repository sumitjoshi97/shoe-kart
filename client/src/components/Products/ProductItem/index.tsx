import React from 'react'
import { ProductProps } from '../interface'

const ProductItem: React.FC<ProductProps> = props => {
  const { id, name, image, price } = props
  const product = (
    <div className="product-item">
      <div className="product-item__img">
        <img src={image} alt={name} />
      </div>
      <div className="product-item__info">
        <div className="product-item__info__name">{name}</div>
        <div className="product-item__info__price">{price}</div>
      </div>
    </div>
  )
  return product
}

export default ProductItem
