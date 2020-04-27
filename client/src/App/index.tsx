import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from '../components/shared/Header'
import Home from '../components/Home'
import Results from '../components/Results'
import Product from '../components/Product'

const App: React.FC = () => (
  <>
    <Header />
    <div className="app-container">
      <Switch>
        <Route path="/product/:productId" component={Product} />
        <Route path="/results" component={Results} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  </>
)

export default App
