import React from 'react'
import useCart from '~hooks/cart/useCart'

export default function withCart<T>(Component: React.ComponentType<T>) {
  function WithCart(props: T) {
    const cart = useCart()

    return <Component {...props} {...cart} />
  }

  return WithCart
}
