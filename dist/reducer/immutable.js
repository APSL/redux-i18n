'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i18nState = i18nState;

var _immutable = require('immutable');

var reduxI18nState = new _immutable.Map({
  lang: 'en'
}); /*
     * Project: redux-i18n
     * File: reducer/immutable.js
     */

function i18nState() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : reduxI18nState;
  var action = arguments[1];

  switch (action.type) {
    case 'REDUX_I18N_SET_LANGUAGE':
      return state.set('lang', action.lang);
    default:
      return state;
  }
}