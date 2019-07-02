import React from 'react'
import { Provider, connect } from 'react-redux'
import ReactDOM from 'react-dom'

import store from './store'
import { fetchCookies } from './cookiesReducer'

class App extends React.Component {
  componentDidMount() {
    console.log('COMPONENT DID MOUNT')
    this.props.getCookiesFromServer()
  }
  render() {
    console.log(this.props)
    const { cookies } = this.props
    if (!cookies || cookies.length === 0) {
      return <div>Still waiting for cookies.....</div>
    }
    return (
      <React.Fragment>
        <h1>Hello from REACT....</h1>
        <ul>
          {cookies.map(cookie => (
            <li key={cookie.id}>{cookie.name}</li>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

// READING FROM REDUX
const mapState = state => {
  console.log('state', state)
  return {
    cookies: state,
  }
}

// WRITING TO REDUX
const mapDispatch = dispatch => {
  return {
    getCookiesFromServer: () => dispatch(fetchCookies()),
  }
}

const ConnectedApp = connect(
  mapState,
  mapDispatch,
)(App)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app')
)
