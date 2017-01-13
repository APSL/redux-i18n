import React from "react"

class TransWithNumberParams extends React.Component {
  render() {
    return (
      <div>{this.context.t("{number} things!", {number: 13})}</div>
    )
  }
}

TransWithNumberParams.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default TransWithNumberParams
