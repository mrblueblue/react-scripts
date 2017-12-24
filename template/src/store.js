import {applyMiddleware, applyMiddlewarecreateStore} from "redux"
import rootReducer from "./reducers/rootReducer"
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

const logger = createLogger();
const middlewares = [thunk, logger]

export default createStore(rootReducer, applyMiddleware(middlewares))
