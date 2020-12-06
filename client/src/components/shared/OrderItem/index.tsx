import React from 'react'
import { Link } from 'react-router-dom'

import Thumbnail from '~components/shared/Thumbnail'
import { ICategory, IOrderItem } from '~interface'
import './styles'

export interface IOrderItemProps {
  orderItem: IOrderItem
}

const OrderItem: React.FC<IOrderItemProps> = ({ orderItem }) => {
  const { product, quantity, selectedSize } = orderItem
  const gender = product.categories.find(
    (category: ICategory) =>
      category.parent && category.parent.name === 'gender',
  )
  const size = product.categories.find(
    (category: ICategory) => category._id === selectedSize,
  )

  return (
    <div className="order-item">
      <Link to={`/product/${orderItem.product._id}`}>
        <Thumbnail img={product.image[0]} title={product.name} />
      </Link>

      <div className="order-item__info">
        <h3 className="order-item__info__title">
          <span>{product.name}</span>
          <span>₹{product.price * orderItem.quantity} </span>
        </h3>
        <h4>{`${gender?.name}'s ${product.mainCategory.name} shoe`}</h4>
        <div className="order-item__info__details">
          <span>{`quantity: ${quantity}`}</span>
          <span>{`size: ${size?.name}`}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
