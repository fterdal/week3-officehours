import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cookies: [],
    }
  }
  async componentDidMount() {
    const response = await axios.get('/api/cookies')
    this.setState({ cookies: response.data })
  }
  render() {
    console.log(this.props)
    console.log('rendering', this.state.cookies)
    if (this.state.cookies.length === 0) {
      return <div>Still waiting for cookies.....</div>
    }
    return (
      <React.Fragment>
        <h1>Hello from REACT....</h1>
        <ul>
          {this.state.cookies.map(cookie => (
            <li key={cookie.id}>{cookie.name}</li>
          ))}
        </ul>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
