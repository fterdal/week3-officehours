import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { cookiesReducer } from './cookiesReducer'
import { singleCookieReducer } from './singleCookieReducer'

const reducer = combineReducers({
  cookies: cookiesReducer,
  singleCookie: singleCookieReducer
})

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  )
)
