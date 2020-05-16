import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from '../components/Auth'
import Header from '../components/Header'
import Home from '../components/Home'
import Results from '../components/Results'
import Product from '../components/Product'
import { useGlobalState } from '~store'

const App: React.FC = () => {
  const {
    state: { auth },
  } = useGlobalState()

  console.info('@@app', auth)
  return (
    <>
      <Header />
      <div className="app-container">
        {auth.showAuthDialog && auth.userId === '' && <Auth />}
        <Switch>
          <Route path="/product/:productId" component={Product} />
          <Route path="/results" component={Results} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </>
  )
}

export default App
