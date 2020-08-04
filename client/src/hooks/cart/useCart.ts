import { useState, useEffect, useMemo } from 'react'
import { useGlobalState } from '~store'
import isEmpty from '~helpers/isEmpty'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  fetchCartQuery,
  addToCartMutation,
  removeFromCartMutation,
  updateCartItemMutation,
  clearCartMutation,
} from './queries'
import { getLocalCart, setLocalCart } from '~helpers/localCart'
import { v4 as uuid } from 'uuid'

const initCartStore = {
  quantity: 0,
  price: 0,
  items: {},
}

const useCart = () => {
  const { state } = useGlobalState()
  const [cartStore, setCartStore] = useState(initCartStore)
  const isAuth = !isEmpty(state.userId)

  const {
    loading: isCartLoading,
    data: cartData,
    refetch: refetchCart,
  } = useQuery(fetchCartQuery)

  const [addToCartMutationFun, { loading: addToCartLoading }] = useMutation(
    addToCartMutation,
  )

  const [
    removeFromCartMutationFun,
    { loading: removeFromCartLoading },
  ] = useMutation(removeFromCartMutation)

  const [
    updateCartItemMutationFun,
    { loading: updateCartItemLoading },
  ] = useMutation(updateCartItemMutation)

  const [clearCartMutationFun] = useMutation(clearCartMutation)

  useEffect(() => {
    if (isAuth && !isEmpty(cartStore.items)) {
      Object.values(cartStore).forEach((cartItem: any) =>
        addToCartMutationFun({
          variables: {
            productId: cartItem.product._id,
            quantity: cartItem.quantity,
            selectedSize: cartItem.selectedSize,
          },
        }),
      )
      setCartStore(initCartStore)
      setLocalCart({})
      refetchCart()
    }
  }, [isAuth, cartStore])

  useEffect(() => {
    refetchCart()
  }, [isAuth])

  const cart = useMemo(() => {
    if (cartData && cartData.cart && isAuth) {
      return cartData.cart
    }

    if (!isAuth && !isEmpty(state.cart)) {
      return {
        items: Object.values(cartStore.items),
        price: cartStore.price,
        quantity: cartStore.quantity,
      }
    }

    const localCart = getLocalCart()
    if (localCart && !isAuth && isEmpty(cart)) {
      const parsedCart = JSON.parse(localCart)
      if (!isEmpty(parsedCart)) {
        setCartStore(parsedCart)
        return {
          items: Object.values(parsedCart.items),
          price: parsedCart.price,
          quantity: parsedCart.quantity,
        }
      }
    }

    return initCartStore
  }, [isAuth, cartData, cartStore])

  const handleAddItemToCart = (
    product: any,
    selectedSize: number,
    quantity: number = 1,
  ) => {
    if (!isAuth) {
      const { _id, name, image, price, size, gender, category } = product
      const cartItem = {
        _id: uuid(),
        product: {
          _id: _id,
          name: name,
          image: image[0],
          price: price,
          size: size,
          gender: gender,
          category: category,
        },
        quantity: 1,
        selectedSize,
      }

      const updatedCart = {
        ...cartStore,
        quantity: cartStore.quantity + quantity,
        price: cartStore.price + parseInt(price) * quantity,
        items: { ...cartStore.items, [cartItem._id]: cartItem },
      }
      setLocalCart(updatedCart)
      setCartStore(updatedCart)
    }

    if (isAuth) {
      addToCartMutationFun({
        variables: {
          productId: product._id,
          quantity,
          selectedSize,
        },
        refetchQueries: [{ query: fetchCartQuery }],
      })
    }
  }

  const handleRemoveCartItem = (cartItemId: string) => {
    if (!isAuth) {
      const tempCartItems = cartStore.items as any // fix type //
      const cartItem = tempCartItems[cartItemId]
      delete tempCartItems[cartItemId]

      const updatedCart = {
        quantity: cartStore.quantity - cartItem.quantity,
        price: cartStore.price - cartItem.price,
        items: tempCartItems,
      }
      setLocalCart(updatedCart)
      setCartStore(updatedCart)
    }

    if (isAuth) {
      removeFromCartMutationFun({
        variables: { cartItemId },
        refetchQueries: [{ query: fetchCartQuery }],
      })
    }
  }

  const handleUpdateCartItem = (
    cartItemId: string,
    quantity: number,
    selectedSize: number,
  ) => {
    if (!isAuth) {
      const cartItem = cartStore.items[cartItemId]
      const updatedCartQuantity =
        cartStore.quantity - cartItem.quantity + quantity
      const updatedCartPrice =
        cartStore.price +
        (quantity - cartItem.product.quantity) * cartItem.price

      cartItem.quantity = quantity
      cartItem.selectedSize = selectedSize

      const updatedCart = {
        ...cartStore,
        quantity: updatedCartQuantity,
        price: updatedCartPrice,
        items: { ...cartStore.items, [cartItemId]: cartItem },
      }

      setLocalCart(updatedCart)
      setCartStore(updatedCart)
    }
    if (isAuth) {
      updateCartItemMutationFun({
        variables: { cartItemId, quantity, selectedSize },
        refetchQueries: [{ query: fetchCartQuery }],
      })
    }
  }

  const handleClearCart = () => {
    if (!isAuth) return

    if (isAuth && cartData.cart.quantity > 0) {
      clearCartMutationFun({
        refetchQueries: [{ query: fetchCartQuery }],
      })
    }
  }

  return {
    cart,
    addItemToCart: handleAddItemToCart,
    removeItemFromCart: handleRemoveCartItem,
    updateCartItem: handleUpdateCartItem,
    clearCart: handleClearCart,
    isCartLoading,
    addToCartLoading,
    removeFromCartLoading,
    updateCartItemLoading,
  }
}

export default useCart
