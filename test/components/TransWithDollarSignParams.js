import React from "react"
import {PropTypes} from 'prop-types'

class TransWithParams extends React.Component {
  render() {
    return (
      <div>{this.context.t("We should have two dollar signs {dollarSigns}!", {dollarSigns: "$$"})}</div>
    )
  }
}

TransWithParams.contextTypes = {
  t: PropTypes.func.isRequired
}

export default TransWithParams
