import React from 'react'
import { Link } from 'react-router-dom'

import { IProductProps } from '../interface'

const ProductCard: React.FC<IProductProps> = props => {
  const { id, name, image, price, gender, category, length } = props

  const product = (
    <div className="product-card">
      <Link to={`product/${id}`} className="product-card__link" />
      <div
        className="product-card__img"
        style={{
          width: `calc(${length}px - 2rem)`,
          height: `calc(${length}px - 2rem)`,
        }}
      >
        <img src={image} alt={name} />
      </div>
      <div className="product-card__info">
        <div className="product-card__info__name">{name}</div>
        <div className="product-card__info__price">{price}</div>
      </div>
      <div className="product-card__type">
        {gender}'s {category} shoe{' '}
      </div>
    </div>
  )

  return product
}

export default ProductCard
