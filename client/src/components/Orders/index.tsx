import React from 'react'

import Order from './Order'
import useOrder from '~hooks/order/useOrder'

import isEmpty from '~helpers/isEmpty'
import { IOrder } from '~interface'

import './styles.scss'
import Layout from '~components/Layout'
import Loading from '~components/shared/Loading'

const Orders = () => {
  const { orders, ordersLoading } = useOrder()

  const renderOrders = () => {
    if (ordersLoading) return <Loading />

    if (!orders && isEmpty(orders)) return

    return orders.map((order: IOrder) => (
      <Order key={order._id} order={order} />
    ))
  }
  return (
    <Layout small>
      <div className="orders ">
        <h2>My Orders</h2>
        <div className="orders__list">{renderOrders()}</div>
      </div>
    </Layout>
  )
}

export default Orders
