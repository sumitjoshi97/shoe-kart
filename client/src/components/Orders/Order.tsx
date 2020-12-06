import React from 'react'
import moment from 'moment'

import OrderItem from '~components/shared/OrderItem'

import { IOrder, IOrderItem } from '~interface'

export interface IOrderProps {
  order: IOrder
}

const Order: React.FC<IOrderProps> = ({
  order: { _id: orderId, date, price, quantity, items },
}) => {
  const renderOrderItems = () => {
    return items.map((item: IOrderItem) => (
      <OrderItem key={item._id} orderItem={item} />
    ))
  }

  return (
    <div className="order">
      <div className="order__header">
        <div className="order__header__item">
          <span>Order No</span>
          {orderId}
        </div>
        <div className="order__header__item">
          <span>Ordered on</span>
          {moment(date).format('Do MMM YY, h:mm a')}
        </div>
        <div className="order__header__item">
          <span>Items</span>
          {quantity}
        </div>
        <div className="order__header__item">
          <span>Total</span>₹{price}
        </div>
      </div>

      <div className="order__items">{renderOrderItems()}</div>
    </div>
  )
}

export default Order
