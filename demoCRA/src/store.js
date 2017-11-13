import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import promise from "redux-promise"
import logger from "redux-logger"
import appReducer from "./reducer"

export const store = createStore(
  appReducer,
  applyMiddleware(thunk, promise, logger)
)
