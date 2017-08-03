/*
 * Project: redux-i18n
 * File: component/component.js
 */

import React from 'react'
import {PropTypes} from 'prop-types'
import deepForceUpdate from 'react-deep-force-update'
import {setForceRefresh, setLanguage} from '../actions'

class I18n extends React.Component {

  constructor(props) {
    super(props)
    this.trans = this.trans.bind(this)
  }

  // It check if text have params
  params(text, params) {
    // if params don't exist, just return the string
    if (!params) {
      return text;
    }

    const children = text.split(/({[^}]+})/g)
      .map((child) => {
        const match = /{(.+)}/g.exec(child);
        if (match) {
          const param = params[match[1]];
          return param ? param : String(param)
        }

        return child;
      });

    // if any children are objects (i.e. react components), wrap in a span, otherwise return as string
    // ignore anything that is falsy, bypassing null, etc
    return children.some(child => child && typeof child === 'object')
      // When React 16 is released, change the span to an identity function for array children,
      // removing the extra dom node
      ? React.createElement('span', null, ...children)
      : children.join('');
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

    // If don't have message lang dictionary...
    if (langMessages === undefined && !this.props.fallbackLang) {
      return this.params(textKey, params)
    }

    let message = langMessages ? langMessages[textKey] : undefined;
    if (message === undefined || message === '') {
      // If don't have literal translation and have fallback lang, try
      // to get from there.
      if (this.props.fallbackLang && translations[this.props.fallbackLang]) {
        let literal = translations[this.props.fallbackLang][textKey]
        if (literal !== undefined && literal !== '') {
          return this.params(literal, params)
        }
      }
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
  t: PropTypes.func.isRequired
}

I18n.propTypes = {
  translations: PropTypes.object.isRequired,
  useReducer: PropTypes.bool,
  initialLang: PropTypes.string,
  fallbackLang: PropTypes.string
}

I18n.defaultProps = {
  useReducer: false,
  initialLang: 'en',
  fallbackLang: null
}

export default I18n
