import { App, AppProvider } from './views'
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import ScrollToTop from './components/ScrollToTop'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <ScrollToTop />
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals(console.log)
