import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import appReducer from './reducer'

const logger = createLogger({
  collapsed: true
})

export const store = createStore(
  appReducer,
  applyMiddleware(thunk, promise, logger)
)
