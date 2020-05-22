import React, { useReducer, createContext, useContext } from 'react'

import { initialState, reducer } from './reducer'

// import combineReducers from './combineReducers'

// const [rootReducer, initialState] = combineReducers({
//   auth: [authReducer, authInitialState],
// })

const GlobalStateContext = createContext<any>(initialState)
const GlobalDispatchContext = createContext<any>(initialState)

const GlobalStateProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlobalStateContext.Provider value={{ state }}>
      <GlobalDispatchContext.Provider value={{ dispatch }}>
        {props.children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

const useGlobalState = () => {
  const context = useContext(GlobalStateContext)

  if (context === undefined) {
    throw Error('useGlobalState must be used within GlobalStateProvider')
  }
  return context
}

const useGlobalDispatch = () => {
  const context = useContext(GlobalDispatchContext)

  if (context === undefined) {
    throw Error('useGlobalDispatch must be used within GlobalDispatchProvider')
  }
  return context
}

export { useGlobalState, useGlobalDispatch, GlobalStateProvider }
