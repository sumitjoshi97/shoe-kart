import actionTypes from './actionTypes'
import { IGlobalContextState } from './interface'
import { ICartItem } from '~components/Cart/interface'

const initCart = {
  quantity: 0,
  price: 0,
  items: {},
}

export const initialState = {
  userId: '',
  showAuthDialog: false,
  cart: initCart,
  cartSize: 0,
  cartPrice: 0,
}

const addUser = (state: IGlobalContextState, user: string, token: string) => {
  if (!localStorage.getItem('credentials')) {
    const credentials = {
      user_id: user,
      access_token: token,
      token_type: 'bearer',
    }
    localStorage.setItem('credentials', JSON.stringify(credentials))
  }
  return { ...state, userId: user }
}

const removeUser = (state: IGlobalContextState) => {
  localStorage.removeItem('credentials')
  return { ...state, userId: initialState.userId }
}

const addToCart = (state: any, cartItem: ICartItem) => {
  const updatedCart = {
    ...state.cart,
    quantity: state.quantity + 1,
    price: state.price + cartItem.product.price,
    items: { ...state.items, [cartItem._id]: cartItem },
  }
  localStorage.setItem('cart', JSON.stringify(updatedCart))
  return { ...state, cart: updatedCart }
}

const updateCartItem = (
  state: any,
  cartItemId: string,
  quantity: number,
  selectedSize: number,
) => {
  const cartItem = state.cart.items[cartItemId]
  const updatedCartQuantity = state.quantity - cartItem.quantity + quantity
  const updatedCartPrice =
    state.price + (quantity - cartItem.product.quantity) * cartItem.price

  cartItem.quantity = quantity
  cartItem.selectedSize = selectedSize

  const updatedCart = {
    ...state.cart,
    quantity: updatedCartQuantity,
    price: updatedCartPrice,
    items: { ...state.items, [cartItemId]: cartItem },
  }

  localStorage.setItem('cart', JSON.stringify(updatedCart))
  return { ...state, cart: updatedCart }
}

const removeFromCart = (state: any, cartItemId: any) => {
  const tempCartItems = state.cart.items
  const cartItem = tempCartItems[cartItemId]
  const updatedCartQuantity = state.cart.quantity - cartItem.quantity
  const updatedCartPrice = state.cart.price - cartItem.price

  delete tempCartItems[cartItemId]

  const updatedCart = {
    quantity: updatedCartQuantity,
    price: updatedCartPrice,
    items: tempCartItems,
  }
  localStorage.setItem('cart', JSON.stringify(updatedCart))
  return {
    ...state,
    cart: updatedCart,
  }
}

const clearCart = (state: any) => {
  localStorage.removeItem('cart')
  return { ...state, cart: {} }
}

//auth reducer
export const reducer = (state: IGlobalContextState, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return addUser(state, action.user, action.token)

    case actionTypes.REMOVE_USER:
      return removeUser(state)

    case actionTypes.SHOW_AUTH_DIALOG:
      return { ...state, showAuthDialog: !state.showAuthDialog }

    case actionTypes.INIT_CART:
      return { ...state, cart: action.cart }

    case actionTypes.ADD_TO_CART:
      return addToCart(state, action.cartItem)

    case actionTypes.UPDATE_CART_ITEM:
      return updateCartItem(
        state,
        action.cartItemId,
        action.quantity,
        action.selectedSize,
      )

    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action.cartItemId)

    case actionTypes.CLEAR_CART:
      return clearCart(state)

    default:
      return state
  }
}
