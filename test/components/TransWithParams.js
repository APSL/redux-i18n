import React from "react"
import {PropTypes} from 'prop-types'

class TransWithParams extends React.Component {
  render() {
    return (
      <div>{this.context.t("Hello {name}!", {name: "Francesc"})}</div>
    )
  }
}

TransWithParams.contextTypes = {
  t: PropTypes.func.isRequired
}

export default TransWithParams
