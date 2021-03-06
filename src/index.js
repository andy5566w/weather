import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './scss/main.scss'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './state/reducers'
import thunk from 'redux-thunk'

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <App />
  </Provider>,
  document.getElementById('root')
)
