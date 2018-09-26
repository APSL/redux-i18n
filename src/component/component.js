/*
 * Project: redux-i18n
 * File: component/component.js
 */


import React from 'react'
import {PropTypes} from 'prop-types'
import deepForceUpdate from 'react-deep-force-update'
import {setForceRefresh, setLanguage} from '../actions'
import getTranslateFunction from '../getTranslateFunction';


class I18n extends React.Component {

  getChildContext() {
    const {lang, fallbackLang, useReducer, translations_reducer, translations, newFallbackLang} = this.props;
    return {
      t: getTranslateFunction(
        useReducer ? translations_reducer : translations,
        lang,
        newFallbackLang ? newFallbackLang : fallbackLang
      )
    };
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
    if (!this.props.initialized) {
      this.props.dispatch(setLanguage(this.props.initialLang))
    }
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
  fallbackLang: PropTypes.string,
  initialized: PropTypes.bool
}

I18n.defaultProps = {
  useReducer: false,
  initialLang: 'en',
  fallbackLang: null
}

export default I18n
