import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import client from './api/client'
import { ContextProvider } from '~context/ContextProvider'

import './globalStyles.scss'

const app = (
  <Router>
    <ApolloProvider client={client}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ApolloProvider>
  </Router>
)

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('serviceWorker.js')
// }

render(app, document.getElementById('app'))
