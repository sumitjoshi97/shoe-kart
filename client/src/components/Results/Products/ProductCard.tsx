import React from 'react'
import { IProductProps } from '../interface'

const ProductCard: React.FC<IProductProps> = props => {
  const { name, image, price } = props

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

export default ProductCard
