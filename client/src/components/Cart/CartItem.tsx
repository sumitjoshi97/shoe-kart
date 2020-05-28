import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from '../shared/Dropdown'
import Button from '~components/shared/Button'
import { ICartItemProps } from './interface'

const defaulltQuantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const updateTypes = {
  SIZE: 'SIZE',
  QUANTITY: 'QUANTITY',
}

const CartItem: React.FC<ICartItemProps> = props => {
  const { id, updateCartItem } = props
  const handleDropdown = (updateType: string, updateValue: number) => {
    updateCartItem(
      id,
      updateType === updateTypes.QUANTITY ? updateValue : props.quantity,
      updateType === updateTypes.SIZE ? updateValue : props.selectedSize,
    )
  }

  return (
    <div className="cart-item">
      <div className="cart-item__thumbnail">
        <Link to={`product/${props.productId}`} />
        {/* <img src={props.image} alt="" /> */}
      </div>
      <div className="cart-item__info">
        <div className="cart-item__info__header">
          <h2 className="cart-item__info__header__primary">{props.name}</h2>
          <p className="cart-item__info__header__secondary">
            {`${props.gender} ${props.category} shoe`}
          </p>
        </div>
        <div className="cart-item__info__dropdown">
          <div className="cart-item__info__dropdown__size">
            <h4 className="cart-item__info__dropdown__size__header">size</h4>
            <Dropdown
              type={updateTypes.SIZE}
              value={props.selectedSize}
              options={props.size}
              handleDropdown={handleDropdown}
            />
          </div>
          <div className="cart-item__info__dropdown__quantity">
            <h4 className="cart-item__info__dropdown__quantity__header">
              qunatity
            </h4>
            <Dropdown
              type={updateTypes.QUANTITY}
              value={props.quantity}
              options={defaulltQuantities}
              handleDropdown={handleDropdown}
            />
          </div>
        </div>
        <div className="cart-item__info__ctas">
          <Button onClick={() => props.removeCartItem(props.id)}>Remove</Button>
        </div>
      </div>
      <div className="cart-item__price">${props.price}</div>
    </div>
  )
}

export default CartItem
