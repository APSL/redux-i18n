/*
 * Project: I18n
 * Author: https://apsl.net
 * Description: Lib for internationalize your React app
 */
import React from "react"
import {connect} from "react-redux"
import deepForceUpdate from 'react-deep-force-update'

class I18n extends React.Component {

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

  getChildContext() {
    return {
      t: this.trans.bind(this),
      currentLang: this.props.lang
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lang !== this.props.lang) {
      deepForceUpdate(this)
    }
  }

  render() {
    return this.props.children
  }
}

I18n.childContextTypes = {
  t: React.PropTypes.func.isRequired,
  currentLang: React.PropTypes.string.isRequired
}

I18n.propTypes = {
  translations: React.PropTypes.object.isRequired
}

export default connect(state => ({
  lang: state.session.lang
}))(I18n)
