/*
 * Project: redux-i18n
 * File: actions.js
 */

export function setLanguage(lang) {
  return {type: 'REDUX_I18N_SET_LANGUAGE', lang}
}

export function setTranslations(translations) {
  return { type: 'REDUX_I18N_SET_TRANSLATIONS', translations}
}
