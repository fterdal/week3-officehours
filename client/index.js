import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  console.log('HERE IS A THING')
  return (
    <h1>Hello from REACT!</h1>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
