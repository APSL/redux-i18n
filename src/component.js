/*
 * Project: redux-i18n
 * File: component.js
 */
import React from "react"
import {connect} from "react-redux"
import deepForceUpdate from "react-deep-force-update"
import moment from "moment"

class I18n extends React.Component {

  constructor(props) {
    super(props)

    this.trans = this.trans.bind(this)
    this.d1 = this.date.bind(this, false)
    this.d2 = this.date.bind(this, true)

    moment.locale(this.props.lang)
  }

  // Check if the text need replace some params
  params(text, params) {
    if (params !== undefined) {
      for (let k in params) {
        let reg = new RegExp("\{" + k + "\}", "g")
        text = text.replace(reg, params[k])
      }
    }
    return text
  }

  // Main method for translating texts
  trans(textKey, params) {
    let langMessages = this.props.translations[this.props.lang]

    if (langMessages === undefined) {
      return this.params(textKey, params)
    }

    let message = langMessages[textKey]
    if (message === undefined || message === "") {
      return this.params(textKey, params)
    }

    return this.params(message, params)
  }

  // Parsing dates
  date(date2, momentObj) {
    return momentObj.format(date2 ? this.props.dateFormat2 : this.props.dateFormat1)
  }

  getChildContext() {
    return {
      t: this.trans,
      d1: this.d1,
      d2: this.d2
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lang !== this.props.lang) {
      deepForceUpdate(this)
      moment.locale(this.props.lang)
    }
  }

  render() {
    return this.props.children
  }
}

I18n.childContextTypes = {
  t: React.PropTypes.func.isRequired,
  d1: React.PropTypes.func.isRequired,
  d2: React.PropTypes.func.isRequired
}

I18n.propTypes = {
  translations: React.PropTypes.object.isRequired,
  dateFormat1: React.PropTypes.string,
  dateFormat2: React.PropTypes.string
}

I18n.defaultProps = {
  dateFormat1: "YYYY-MM-DD",
  dateFormat2: "dd, D MMMM YYYY"
}

export default connect(state => ({
  lang: state.i18nState.lang
}))(I18n)
