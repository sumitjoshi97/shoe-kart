import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from 'src/pages/Home'

const App: React.FC = () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
)

export default App
