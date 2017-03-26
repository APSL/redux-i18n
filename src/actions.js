/*
 * Project: redux-i18n
 * File: actions.js
 */

export function setLanguage(lang) {
  return {type: 'REDUX_I18N_SET_LANGUAGE', lang}
}

export function setTranslations(translations) {
  return function(dispatch) {
    dispatch(setForceRefresh(true))
    return { type: 'REDUX_I18N_SET_TRANSLATIONS', translations}
  }
}

export function setForceRefresh(force) {
  return { type: 'REDUX_I18N_SET_FORCE_REFRES', force}
}
