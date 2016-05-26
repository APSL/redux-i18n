import React from "react"

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
  t: React.PropTypes.func.isRequired
}

export default TransWithoutParams

