import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from '../components/Auth'
import Header from '../components/Header'
import { useGlobalState } from '~store'
import routes from './routes'

const App: React.FC = () => {
  const { state } = useGlobalState()

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
