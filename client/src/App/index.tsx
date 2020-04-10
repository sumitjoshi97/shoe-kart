import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from '../components/shared/Header'
import Home from '../components/Home'
import Results from '../components/Results'

const App: React.FC = () => (
  <>
    <Header />
    <Switch>
      <Route path="/results" component={Results} />
      <Route path="/" component={Home} />
    </Switch>
  </>
)

export default App
