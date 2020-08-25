import React, { createContext, useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import isEmpty from '~helpers/isEmpty'
import { ILocalCart, IProduct } from '~interface'

export interface ICartContext {
  localCart: ILocalCart
  setLocalCartFromLocalStorage: () => void
  deleteLocalCart: () => void
  addItemToLocalCart: (product: any, selectedSize: string) => void
  updateLocalCartItem: (
    cartItemId: string,
    quantity: number,
    selectedSize: string,
  ) => void
  removeItemFromLocalCart: (cartItemId: string) => void
}

export const CartContext = createContext({} as ICartContext)

export const CartProvider: React.FC<React.ReactNode> = ({ children }) => {
  const initLocalCart: ILocalCart = {
    items: {},
    quantity: 0,
    price: 0,
  }

  const [localCart, setLocalCart] = useState(initLocalCart)

  const setLocalCartFromLocalStorage = () => {
    const localStorageCart = localStorage.getItem('cart')
    const cart = JSON.parse(localStorageCart || '{}')
    if (cart && cart.items && !isEmpty(cart.items)) {
      setLocalCart(cart)
    } else {
      setLocalCart(initLocalCart)
    }
  }

  useEffect(() => setLocalCartFromLocalStorage(), [])

  const setLocalStorageCart = (cart: ILocalCart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const addItemToLocalCart = (product: IProduct, selectedSize: string) => {
    const { _id, name, image, price, main_category, categories } = product
    const cartItem = {
      _id: uuid(),
      product: {
        _id,
        name,
        image,
        price,
        main_category,
        categories,
      },
      quantity: 1,
      selectedSize,
    }

    const updatedCart = {
      ...localCart,
      quantity: localCart.quantity + 1,
      price: localCart.price + parseInt(price),
      items: { ...localCart.items, [cartItem._id]: cartItem },
    }
    setLocalStorageCart(updatedCart)
    setLocalCart(updatedCart)
  }

  const updateLocalCartItem = (
    cartItemId: string,
    quantity: number,
    selectedSize: string,
  ) => {
    const cartItem = localCart.items[cartItemId]
    if (!cartItem) return

    const updatedCartQuantity =
      localCart.quantity - cartItem.quantity + quantity
    const updatedCartPrice =
      localCart.price + (quantity - cartItem.quantity) * cartItem.product.price

    cartItem.quantity = quantity
    cartItem.selectedSize = selectedSize

    const updatedCart = {
      ...localCart,
      quantity: updatedCartQuantity,
      price: updatedCartPrice,
      items: { ...localCart.items, [cartItemId]: cartItem },
    }
    setLocalStorageCart(updatedCart)
    setLocalCart(updatedCart)
  }

  const removeItemFromLocalCart = (cartItemId: string) => {
    const tempCartItems = localCart.items
    const cartItem = tempCartItems[cartItemId]
    delete tempCartItems[cartItemId]

    const updatedCart = {
      quantity: localCart.quantity - cartItem.quantity,
      price: localCart.price - cartItem.product.price * cartItem.quantity,
      items: tempCartItems,
    }
    setLocalStorageCart(updatedCart)
    setLocalCart(updatedCart)
  }

  const deleteLocalCart = () => {
    localStorage.removeItem('cart')
    setLocalCart(initLocalCart)
  }

  return (
    <CartContext.Provider
      value={{
        localCart,
        setLocalCartFromLocalStorage,
        deleteLocalCart,
        addItemToLocalCart,
        updateLocalCartItem,
        removeItemFromLocalCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
