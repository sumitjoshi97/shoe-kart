import actionTypes from './actionTypes'
import { IGlobalContextState } from './interface'

export const initialState = {
  userId: '',
  showAuthDialog: false,
  cartSize: 0,
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
  localStorage.removeItem('token')
  return { ...state, userId: '' }
}

const addToCart = (state: IGlobalContextState, cartItem: any) => {
  console.log('@@cartItem', cartItem)
  return { ...state, cart: [...state.cart, cartItem] }
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

    case actionTypes.FETCH_CART:
      return { ...state, cart: action.cart }

    case actionTypes.ADD_TO_CART:
      return addToCart(state, action.cartItem)

    default:
      return state
  }
}
