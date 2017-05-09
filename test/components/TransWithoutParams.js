import React from "react"
import {PropTypes} from 'prop-types'

class TransWithoutParams extends React.Component {
  render() {
    return (
      <div>
        <span>{this.context.t("Hello")}</span>
      </div>
    )
  }
}

TransWithoutParams.contextTypes = {
  t: PropTypes.func.isRequired
}

export default TransWithoutParams
