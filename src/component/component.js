/*
 * Project: redux-i18n
 * File: component/component.js
 */

import React from 'react'
import deepForceUpdate from 'react-deep-force-update'

class I18n extends React.Component {

  constructor(props) {
    super(props)
    this.trans = this.trans.bind(this)
  }

  // Check if the text need replace some params
  params(text, params) {
    if (params !== undefined) {
      for (let k in params) {
        let reg = new RegExp('\{' + k + '\}', 'g')
        // Escape possible '$' in params to prevent unexpected behavior with .replace()
        // especially important for IE11, which misinterprets '$0' as a regex command
        let param = params[k].toString().replace(/\$/g, '$$$$')
        text = text.replace(reg, param)
      }
    }
    return text
  }

  // Main method for translating texts
  trans(textKey, params, comment) {
    let langMessages = this.props.translations[this.props.lang]

    // Checking if textkey contains a pluralize object.
    if (typeof textKey === 'object') {
      textKey = textKey[params[textKey[2]] === 1 ? 0 : 1]
    }

    if (langMessages === undefined) {
      return this.params(textKey, params)
    }

    let message = langMessages[textKey]
    if (message === undefined || message === '') {
      return this.params(textKey, params)
    }

    return this.params(message, params)
  }

  getChildContext() {
    return {
      t: this.trans
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
  t: React.PropTypes.func.isRequired
}

I18n.propTypes = {
  translations: React.PropTypes.object.isRequired
}

export default I18n
