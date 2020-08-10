import actionTypes from './actionTypes'
import { IGlobalContextState } from './interface'

export const initialState = {
  userId: '',
  toggleDialog: false,
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

//auth reducer
export const reducer = (state: IGlobalContextState, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return addUser(state, action.user, action.token)

    case actionTypes.REMOVE_USER:
      return removeUser(state)

    case actionTypes.TOGGLE_DIALOG:
      return { ...state, toggleDialog: !state.toggleDialog }

    default:
      return state
  }
}
