interface IAuthContextState {
  userId: string
  showAuthDialog: boolean
}

const actionTypes = {
  ADD_USER: 'ADD_USER',
  REMOVE_USER: 'REMOVE_USER',
  SHOW_AUTH_DIALOG: 'SHOW_AUTH_DIALOG',
}

export const initialState = {
  userId: '',
  showAuthDialog: false,
}

const addUser = (state: IAuthContextState, user: string, token: string) => {
  localStorage.setItem('token', token)
  return { ...state, userId: user }
}

const removeUser = (state: IAuthContextState) => {
  localStorage.removeItem('token')
  return { ...state, userId: '' }
}

//auth reducer
export const reducer = (state: IAuthContextState, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return addUser(state, action.user, action.token)

    case actionTypes.REMOVE_USER:
      return removeUser(state)

    case actionTypes.SHOW_AUTH_DIALOG:
      return { ...state, showAuthDialog: !state.showAuthDialog }

    default:
      return state
  }
}
