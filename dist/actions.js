'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLanguage = setLanguage;
exports.setTranslations = setTranslations;
exports.setForceRefresh = setForceRefresh;
/*
 * Project: redux-i18n
 * File: actions.js
 */

function setLanguage(lang) {
  return { type: 'REDUX_I18N_SET_LANGUAGE', lang: lang };
}

function updateTranslations(translations) {
  return { type: 'REDUX_I18N_SET_TRANSLATIONS', translations: translations };
}

function setTranslations(translations) {
  return function (dispatch) {
    dispatch(setForceRefresh(true));
    dispatch(updateTranslations(translations));
  };
}

function setForceRefresh(force) {
  return { type: 'REDUX_I18N_SET_FORCE_REFRESH', force: force };
}