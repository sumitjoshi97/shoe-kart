import React from 'react'
import { Link } from 'react-router-dom'
import { IProduct } from '~interface'

interface IProductCardProps extends IProduct {
  width: number
}

const ProductCard: React.FC<IProductCardProps> = props => {
  const { _id, name, image, price, mainCategory, categories, width } = props

  const gender = categories.find(category => category.parent?.name === 'gender')

  const product = (
    <div
      className="product-card"
      style={{
        width: `calc(${width}px - 2rem)`,
      }}
    >
      <Link to={`product/${_id}`} className="product-card__link" />
      <div
        className="product-card__img"
        style={{
          height: `calc(${width}px - 2rem)`,
        }}
      >
        <img src={image[0]} alt={name} />
      </div>
      <div className="product-card__info">
        <div className="product-card__info__name">{name}</div>

        <div className="product-card__info__type">
          {gender?.name}'s {mainCategory.name} shoe{' '}
        </div>

        <div className="product-card__info__price">{price}</div>
      </div>
    </div>
  )

  return product
}

export default ProductCard
