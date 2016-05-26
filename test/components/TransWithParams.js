import React from "react"

class TransWithParams extends React.Component {
  render() {
    return (
      <div>{this.context.t("Hello {name}!", {name: "Francesc"})}</div>
    )
  }
}

TransWithParams.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default TransWithParams
