import { Reducer } from 'react'

export interface IGlobalContextState {
  userId: string
  toggleDialog: boolean
}

export interface Action {
  type: string
  [args: string]: any
}

export interface Reducers {
  [key: string]: Reducer<IGlobalContextState, Action>
}
