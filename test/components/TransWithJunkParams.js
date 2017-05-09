import React from "react"
import {PropTypes} from 'prop-types'

class TransWithJunkParams extends React.Component {
  render() {
    return (
      <div>{this.context.t("{a}, {b}, and {c} as strings", {a: undefined, b: null, c: false})}</div>
    )
  }
}

TransWithJunkParams.contextTypes = {
  t: PropTypes.func.isRequired
}

export default TransWithJunkParams
