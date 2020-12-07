import React, { Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import Auth from '../components/Auth'
import Header from '../components/Header'

import routes from './routes'
import useStores from '~hooks/useStores'

const App = () => {
  const { authStore, uiStore } = useStores()
  const { addUser, isAuth } = authStore
  const { showDialog } = uiStore

  useEffect(() => {
    const credentials = localStorage.getItem('credentials')
    if (credentials) {
      const userId = JSON.parse(credentials).user_id
      const token = JSON.parse(credentials).token
      addUser(userId, token)
    }
  }, [])

  return (
    <>
      <Header />
      <div className="app-container">
        {showDialog && !isAuth && <Auth />}
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
