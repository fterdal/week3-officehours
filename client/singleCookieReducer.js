import axios from 'axios'

// COOKIES!!!!

// ACTION TYPES
const SET_SINGLE_COOKIE = 'SET_SINGLE_COOKIE'

// ACIION CREATORS
export const setSingleCookie = singleCookie => {
  return {
    type: SET_SINGLE_COOKIE,
    singleCookie,
  }
}

// THUNK CREATORS
export const fetchSingleCookie = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/cookies/${id}`)
    dispatch(setSingleCookie(data))
  } catch (err) {
    console.log(err)
  }
}

const initialState = {}

// REDUCER
export const singleCookieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_COOKIE:
      return action.singleCookie
    default:
      return state
  }
}
