/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleCookie } from './singleCookieReducer';
import { withRouter } from 'react-router'

class SingleCookie extends React.Component {
  componentDidMount() {
    console.log('this.props', this.props)
    this.props.fetchSingleCookieFromServer(this.props.match.params.id)
  }
  render() {
    return (
      <div>
        SingleCookie Component: {this.props.singleCookie.name}
      </div>
    )
  }
}

const mapState = store => {
  return {
    singleCookie: store.singleCookie,
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleCookieFromServer: id =>
      dispatch(fetchSingleCookie(id)),
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SingleCookie)
)
