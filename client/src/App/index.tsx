import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from 'src/components/Header'
import Home from 'src/pages/Home'
import Products from 'src/pages/Products'

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
