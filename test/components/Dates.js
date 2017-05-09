import React from "react"
import {PropTypes} from 'prop-types'
import moment from "moment"

class Dates extends React.Component {
  render() {
    let sample = moment("2016-01-01")
    return (
      <div>
        {sample.format(this.context.t("YYYY-MM-DD"))}
      </div>
    )
  }
}

Dates.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Dates
