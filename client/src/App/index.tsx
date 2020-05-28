import React, { Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from '../components/Auth'
import Header from '../components/Header'
import { useGlobalState, useGlobalDispatch } from '~store'
import routes from './routes'

const App: React.FC = () => {
  const { state } = useGlobalState()
  const { dispatch } = useGlobalDispatch()

  useEffect(() => {
    const credentials = localStorage.getItem('credentials')
    if (credentials) {
      const userId = JSON.parse(credentials).user_id
      dispatch({ type: 'ADD_USER', user: userId })
    }
  }, [])

  console.log(state)

  return (
    <>
      <Header />
      <div className="app-container">
        {state.showAuthDialog && state.userId === '' && <Auth />}
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              render={props => (
                <Suspense fallback={<div />}>
                  <route.component {...props} />
                </Suspense>
              )}
            />
          ))}
        </Switch>
      </div>
    </>
  )
}

export default App
