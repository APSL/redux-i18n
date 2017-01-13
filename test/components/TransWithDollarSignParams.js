import React from "react"

class TransWithParams extends React.Component {
  render() {
    return (
      <div>{this.context.t("We should have two dollar signs {dollarSigns}!", {dollarSigns: "$$"})}</div>
    )
  }
}

TransWithParams.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default TransWithParams
