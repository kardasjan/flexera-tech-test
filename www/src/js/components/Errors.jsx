import React from 'react'
import { connect } from 'react-redux'

const Error = ( {message} ) => (
  <div className="alert alert-danger" role="alert">
    { message }
  </div>
)

const ConnectedErrors = ({ errors }) => {
  if (errors.length > 0) {
    return errors.map(
      (error) => {
        return <Error message={error.message} key={error.id} />
      }
    )
  }
  return null
}

const mapStateToProps = (state) => ({errors: state.errors})

const Errors = connect(mapStateToProps, null)(ConnectedErrors)
export default Errors
