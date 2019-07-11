import axios from 'axios'

// COOKIES!!!!

// ACTION TYPES
const SET_COOKIES = 'SET_COOKIES'
const ADD_COOKIE = 'ADD_COOKIE'

// ACIION CREATORS
export const setCookies = cookies => {
  return {
    type: SET_COOKIES,
    cookies,
  }
}
export const addCookie = cookie => {
  return {
    type: ADD_COOKIE,
    cookie,
  }
}

// THUNK CREATORS
export const fetchCookies = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/cookies')
    dispatch(setCookies(data))
  } catch (err) {
    console.log(err)
  }
}

export const postCookie = newCookie => async dispatch => {
  try {
    console.log('TRYING TO POST A COOKIE')
    const { data } = await axios.post('/api/cookies', newCookie)

    // Efficient (Hard) Way
    dispatch(addCookie(data))

    // Inefficient (Easy) Way
    // dispatch(fetchCookies())
  } catch (err) {
    console.log(err)
  }
}

const initialState = []

// REDUCER
export const cookiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COOKIES:
      return action.cookies
    case ADD_COOKIE:
      return [...state, action.cookie]
    default:
      return state
  }
}
