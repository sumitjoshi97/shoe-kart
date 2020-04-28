const combineReducers = (reducers: any) => {
  const reducerKeys: string[] = Object.keys(reducers)
  const reducerValues: any = Object.values(reducers)
  let initialState: any
  reducerKeys.forEach((key, index) => {
    initialState = { ...initialState, [key]: reducerValues[index][1] }
  })
  let finalReducers: any = {}
  reducerValues.forEach((value: any, index: number) => {
    finalReducers = { ...finalReducers, [reducerKeys[index]]: value[0] }
  })

  return [
    (state: any, action: any) => {
      let hasStateChanged = false
      let newState: any = {}
      let nextStateForCurrentKey = {}
      for (let i = 0; i < reducerKeys.length; i++) {
        const currentKey = reducerKeys[i]
        const currentReducer = finalReducers[currentKey]
        const prevStateForCurrentKey = state[currentKey]
        nextStateForCurrentKey = currentReducer(prevStateForCurrentKey, action)
        hasStateChanged =
          hasStateChanged || nextStateForCurrentKey !== prevStateForCurrentKey
        newState[currentKey] = nextStateForCurrentKey
      }
      return hasStateChanged ? newState : state
    },
    initialState,
  ]
}

export default combineReducers
