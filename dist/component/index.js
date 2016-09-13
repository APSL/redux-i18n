'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Project: redux-i18n
 * File: component/index.js
 */

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    lang: state.i18nState.lang
  };
})(_component2.default);