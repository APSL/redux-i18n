'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLanguage = exports.i18nState = exports.I18n = undefined;

var _reducer = require('./reducer');

Object.defineProperty(exports, 'i18nState', {
  enumerable: true,
  get: function get() {
    return _reducer.i18nState;
  }
});

var _actions = require('./actions');

Object.defineProperty(exports, 'setLanguage', {
  enumerable: true,
  get: function get() {
    return _actions.setLanguage;
  }
});

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.I18n = _component2.default; /*
                                     * Project: redux-i18n
                                     * File: index.js
                                     */