import React from "react"
import moment from "moment"

class Dates extends React.Component {

  render() {

    let sample = moment("2016-01-01")

    return (
      <div>
        {this.context.d1(sample)}@@
        {this.context.d2(sample)}
      </div>
    )
  }
}

Dates.contextTypes = {
  d1: React.PropTypes.func.isRequired,
  d2: React.PropTypes.func.isRequired
}

export default Dates
