import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from '../Dropdown'
import Button from '../Button'
import { ICartItemProps } from './interface'

const defaultQuantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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

  const handleDropdown = (updateType: string, updateValue: number) => {
    updateCartItem(
      cartItemId,
      updateType === updateTypes.QUANTITY ? updateValue : quantity,
      updateType === updateTypes.SIZE ? updateValue : selectedSize,
    )
  }

  return (
    <div className="cart-item">
      <div className="cart-item__thumbnail">
        <Link to={`product/${product._id}`} />
        <img src={product.image[0]} alt="" />
      </div>
      <div className="cart-item__info">
        <div className="cart-item__info__header">
          <h2 className="cart-item__info__header__primary">{product.name}</h2>
          <p className="cart-item__info__header__secondary">
            {`${product.gender} ${product.category} shoe`}
          </p>
        </div>
        <div className="cart-item__info__dropdown">
          <div className="cart-item__info__dropdown__size">
            <h4 className="cart-item__info__dropdown__size__header">size</h4>
            <Dropdown
              type={updateTypes.SIZE}
              value={selectedSize}
              options={product.size}
              handleDropdown={handleDropdown}
            />
          </div>
          <div className="cart-item__info__dropdown__quantity">
            <h4 className="cart-item__info__dropdown__quantity__header">
              quantity
            </h4>
            <Dropdown
              type={updateTypes.QUANTITY}
              value={quantity}
              options={defaultQuantities}
              handleDropdown={handleDropdown}
            />
          </div>
        </div>
        <div className="cart-item__info__ctas">
          <Button onClick={() => removeCartItem(cartItemId)}>Remove</Button>
        </div>
      </div>
      <div className="cart-item__price">
        ${parseInt(product.price) * quantity}
      </div>
    </div>
  )
}

export default CartItem