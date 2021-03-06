import {applyMiddleware, createStore} from "redux"
import rootReducer from "./reducers/rootReducer"
import thunk from 'redux-thunk';

const middlewares = [thunk]

if (process.env.NODE_ENV === "development") {
  const logger = require("redux-logger").default
  middlewares.push(logger)
}

export default createStore(rootReducer, applyMiddleware(...middlewares))
