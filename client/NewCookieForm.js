import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postCookie } from './cookiesReducer'

class NewCookieForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cookieName: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.createCookieOnServer({
      name: this.state.cookieName,
    })
    this.setState({ cookieName: '' })
  }
  handleChange(evt) {
    // BAD 👹
    // this.state = {
    //   cookieName: evt.target.value,
    // }

    // GOOD 😇
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }
  render() {
    const { handleSubmit, handleChange } = this
    const { cookieName } = this.state
    return (
      <form onSubmit={handleSubmit}>
        <input
          name="cookieName"
          type="text"
          onChange={handleChange}
          value={cookieName}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    createCookieOnServer: newCookie => dispatch(postCookie(newCookie))
  }
}

export default connect(
  null,
  mapDispatch
)(NewCookieForm)
