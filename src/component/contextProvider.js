/*
 * Project: redux-i18n
 * File: component/context.js
 */

import React, { createContext } from 'react'; // Assuming react 16.3.0
import { PropTypes } from 'prop-types';
import deepForceUpdate from 'react-deep-force-update';
import { setForceRefresh, setLanguage } from '../actions';
import getTranslateFunction from '../getTranslateFunction';

export const I18nContext = createContext();

class I18nProvider extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.forceRefresh && !nextProps.forceRefresh) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.lang !== this.props.lang ||
      (!prevProps.forceRefresh && this.props.forceRefresh)
    ) {
      deepForceUpdate(this);

      if (this.props.forceRefresh) {
        this.props.dispatch(setForceRefresh(false));
      }
    }
  }

  componentWillMount() {
    if (!this.props.initialized) {
      this.props.dispatch(setLanguage(this.props.initialLang));
    }
  }

  render() {
    const {
      lang,
      fallbackLang,
      useReducer,
      translations_reducer,
      translations
    } = this.props;

    return (
      <I18nContext.Provider
        value={{
          t: getTranslateFunction(
            useReducer ? translations_reducer : translations,
            lang,
            fallbackLang
          )
        }}
      >
        {this.props.children}
      </I18nContext.Provider>
    );
  }
}

I18nProvider.propTypes = {
  translations: PropTypes.object.isRequired,
  useReducer: PropTypes.bool,
  initialLang: PropTypes.string,
  fallbackLang: PropTypes.string,
  initialized: PropTypes.bool
};

I18nProvider.defaultProps = {
  useReducer: false,
  initialLang: 'en',
  fallbackLang: null
};

export default I18nProvider;
