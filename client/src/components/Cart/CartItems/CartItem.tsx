import React from 'react'
import { Link } from 'react-router-dom'

import Button from '~components/shared/Button'
import Dropdown from '~components/shared/Dropdown'
import Thumbnail from '~components/shared/Thumbnail'

import { ICartItem, ICategory } from '~interface'

export interface ICartItemProps {
  cartItem: ICartItem
  updateCartItem: (
    cartItemId: string,
    quantity: number,
    selectedSize: string,
  ) => void
  removeCartItem: (cartItemId: string) => void
}

const defaultQuantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(quantity => {
  return { _id: quantity.toString(), name: quantity.toString() }
})

const updateTypes = {
  SIZE: 'SIZE',
  QUANTITY: 'QUANTITY',
}

const CartItem: React.FC<ICartItemProps> = props => {
  const {
    cartItem: { _id: cartItemId, product, quantity, selectedSize },
    updateCartItem,
    removeCartItem,
  } = props

  const sizes = product.categories.filter(
    (category: ICategory) => category.parent?.name === 'size',
  )

  const gender = product.categories.find(
    (category: ICategory) => category.parent?.name === 'gender',
  )

  const handleDropdown = (updateType: string, updateValue: string) => {
    if (updateType === updateTypes.QUANTITY)
      return updateCartItem(cartItemId, parseInt(updateValue), selectedSize)

    if (updateType === updateTypes.SIZE)
      return updateCartItem(cartItemId, quantity, updateValue)

    return
  }

  return (
    <div className="cart-item">
      <Link to={`product/${product._id}`}>
        <Thumbnail img={product.image[0]} title={product.name} />
      </Link>

      <div className="cart-item__info">
        <div className="cart-item__info__header">
          <h3 className="title-secondary">{product.name}</h3>
          <h4 className="title-tertiary">
            {`${gender?.name} ${product.mainCategory.name} shoe`}
          </h4>
        </div>
        <div className="cart-item__info__dropdown">
          <div className="cart-item__info__dropdown__item">
            <span>size</span>
            <Dropdown
              type={updateTypes.SIZE}
              current={selectedSize}
              options={sizes}
              handleDropdown={handleDropdown}
            />
          </div>
          <div className="cart-item__info__dropdown__item">
            <span>quantity</span>
            <Dropdown
              type={updateTypes.QUANTITY}
              current={quantity.toString()}
              options={defaultQuantities}
              handleDropdown={handleDropdown}
            />
          </div>
        </div>
        <div className="cart-item__info__ctas">
          <Button onClick={() => removeCartItem(cartItemId)}>Remove</Button>
        </div>
      </div>
      <div className="cart-item__price">${product.price * quantity}</div>
    </div>
  )
}

export default CartItem
