/*
 * Project: redux-i18n
 * File: component/component.js
 */

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import deepForceUpdate from 'react-deep-force-update'
import {setForceRefresh, setLanguage} from '../actions'

class I18n extends React.Component {

  constructor(props) {
    super(props)
    this.trans = this.trans.bind(this)
  }

  // It check if text have params
  params(text, params) {
    if (params !== undefined) {
      for (let k in params) {
        let reg = new RegExp('\{' + k + '\}', 'g')
        let param = params[k];

        // Escape possible '$' in params to prevent unexpected behavior with .replace()
        // especially important for IE11, which misinterprets '$0' as a regex command
        if (typeof param === 'string') {
          param = param.replace(/\$/g, '$$$$');
        } else if (typeof param === 'object' && param !== null) {
          param = ReactDOMServer.renderToStaticMarkup(param)
        }

        text = text.replace(reg, param)
      }
    }
    return text
  }

  // Main method for translating texts
  trans(textKey, params, comment) {
    const translations = this.props.useReducer ? this.props.translations_reducer : this.props.translations
    let langMessages = translations[this.props.lang]

    // Checking if textkey contains a pluralize object.
    if (typeof textKey === 'object') {
      textKey = textKey[params[textKey[2]] === 1 ? 0 : 1]
    }

    // Fall back lang
    if (langMessages === undefined && this.props.lang.indexOf('-') > -1) {
      langMessages = translations[this.props.lang.split('-')[0]]
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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.forceRefresh && !nextProps.forceRefresh) {
      return false
    }
    return true
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lang !== this.props.lang || (!prevProps.forceRefresh && this.props.forceRefresh)) {
      deepForceUpdate(this)

      if (this.props.forceRefresh) {
        this.props.dispatch(setForceRefresh(false))
      }
    }
  }

  componentWillMount() {
    this.props.dispatch(setLanguage(this.props.initialLang))
  }

  render() {
    return this.props.children
  }
}

I18n.childContextTypes = {
  t: React.PropTypes.func.isRequired
}

I18n.propTypes = {
  translations: React.PropTypes.object.isRequired,
  useReducer: React.PropTypes.bool,
  initialLang: React.PropTypes.string
}

I18n.defaultProps = {
  useReducer: false,
  initialLang: 'en'
}

export default I18n
