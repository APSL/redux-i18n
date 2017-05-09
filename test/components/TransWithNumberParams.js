import React from "react"
import {PropTypes} from 'prop-types'

class TransWithNumberParams extends React.Component {
  render() {
    return (
      <div>{this.context.t("{number} things!", {number: 13})}</div>
    )
  }
}

TransWithNumberParams.contextTypes = {
  t: PropTypes.func.isRequired
}

export default TransWithNumberParams
