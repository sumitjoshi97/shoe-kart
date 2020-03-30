import { render } from 'react-dom'

import App from './App'

const app = <App />

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('serviceWorker.js')
// }

render(app, document.getElementById('app'))
