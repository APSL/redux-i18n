import React from "react"

class TransWithJunkParams extends React.Component {
  render() {
    return (
      <div>{this.context.t("{a}, {b}, and {c} as strings", {a: undefined, b: null, c: false})}</div>
    )
  }
}

TransWithJunkParams.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default TransWithJunkParams
