import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from '../components/shared/Header'
import Home from '../components/Home'
import Products from '../components/Products'

const App: React.FC = () => (
  <>
    <Header />
    <Switch>
      <Route path="/products" component={Products} />
      <Route path="/" component={Home} />
    </Switch>
  </>
)

export default App
