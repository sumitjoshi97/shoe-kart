import { useEffect, useMemo } from 'react'

import isEmpty from '~helpers/isEmpty'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  fetchCartQuery,
  addToCartMutation,
  removeFromCartMutation,
  updateCartItemMutation,
  clearCartMutation,
} from './queries'

import useStores from '~hooks/useStores'
import { ICartItem, IProduct } from '~interface'

const useCart = () => {
  const { authStore, cartStore } = useStores()
  const { isAuth } = authStore
  const {
    localCart,
    addItemToLocalCart,
    deleteLocalCart,
    updateLocalCartItem,
    removeItemFromLocalCart,
    setLocalCartFromLocalStorage,
  } = cartStore

  const {
    loading: isCartLoading,
    data: cartData,
    refetch: refetchCart,
  } = useQuery(fetchCartQuery, {
    skip: !isAuth,
  })

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
    if (!isAuth) {
      setLocalCartFromLocalStorage()
    }
  }, [])

  useEffect(() => {
    if (isAuth && !isEmpty(localCart.items)) {
      Object.values(localCart.items).forEach((cartItem: ICartItem) =>
        addToCartMutationFun({
          variables: {
            productId: cartItem.product._id,
            quantity: cartItem.quantity,
            selectedSize: cartItem.selectedSize,
          },
        }),
      )
      deleteLocalCart()
      refetchCart()
    }

    if (isAuth && isEmpty(localCart.items)) {
      refetchCart()
    }
  }, [isAuth])

  const cart = useMemo(() => {
    if (cartData && cartData.cart && isAuth) {
      return cartData.cart
    }

    if (!isAuth && !isEmpty(localCart.items)) {
      return {
        items: Object.values(localCart.items),
        price: localCart.price,
        quantity: localCart.quantity,
      }
    }

    return {}
  }, [isAuth, cartData, localCart])

  const handleAddItemToCart = (product: IProduct, selectedSize: string) => {
    if (isEmpty(selectedSize)) return

    if (!isAuth) {
      addItemToLocalCart(product, selectedSize)
    }

    if (isAuth) {
      addToCartMutationFun({
        variables: {
          productId: product._id,
          quantity: 1,
          selectedSize,
        },
        refetchQueries: [{ query: fetchCartQuery }],
      })
    }
  }

  const handleRemoveCartItem = (cartItemId: string) => {
    if (!isAuth) {
      removeItemFromLocalCart(cartItemId)
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
    selectedSize: string,
  ) => {
    if (!isAuth) {
      updateLocalCartItem(cartItemId, quantity, selectedSize)
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
