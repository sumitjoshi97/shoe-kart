import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import './globalStyles.scss'

const app = (
  <Router>
    <App />
  </Router>
)

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('serviceWorker.js')
// }

render(app, document.getElementById('app'))

// react hot module replacement
// if (module.hot) {
//   module.hot.accept()
// }
