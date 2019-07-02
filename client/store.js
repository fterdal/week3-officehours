import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { cookiesReducer } from './cookiesReducer'

export default createStore(
  cookiesReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  )
)
