import React from 'react'
import { Provider, connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import store from './store'
import { fetchCookies } from './cookiesReducer'
import SingleCookie from './SingleCookie'
import NewCookieForm from './NewCookieForm'

// Binding is only really useful if we care about the this context.

class App extends React.Component {
  componentDidMount() {
    this.props.getCookiesFromServer()
  }
  render() {
    // console.log(this.props)
    const { cookies } = this.props
    if (!cookies || cookies.length === 0) {
      return <div>Still waiting for cookies.....</div>
    }
    return (
      <React.Fragment>
        <h1>Hello from REACT....</h1>
        <Switch>
          <Route exact path="/" component={SingleCookie} />
          <Route path="/cookies/:id" component={SingleCookie} />
        </Switch>
        <NewCookieForm />
        <ul>
          {cookies.map(cookie => (
            <li key={cookie.id}>
              <Link to={`/cookies/${cookie.id}`}>{cookie.name}</Link>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

// READING FROM REDUX
const mapState = state => {
  // console.log('state', state)
  return {
    cookies: state.cookies,
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
  mapDispatch
)(App)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConnectedApp />
    </Router>
  </Provider>,
  document.getElementById('app')
)
