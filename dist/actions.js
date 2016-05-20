"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLanguage = setLanguage;
/*
 * Project: redux-i18n
 * File: actions.js
 */

function setLanguage(lang) {
  return { type: "REDUX_I18N_SET_LANGUAGE", lang: lang };
}