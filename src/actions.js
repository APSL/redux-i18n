/*
 * Project: redux-i18n
 * File: actions.js
 */

export function setLanguage(lang) {
  return {type: 'REDUX_I18N_SET_LANGUAGE', lang}
}

function updateTranslations(translations) {
  return {type: 'REDUX_I18N_SET_TRANSLATIONS', translations}
}

export function setTranslations(translations, language) {
  return function(dispatch, getState) {
    if (language === undefined) {
      dispatch(updateTranslations(translations))
    } else {
      const state = getState()
      let trans = null

      // Compatibility with immutable
      if (state.i18nState === undefined) {
        trans = state.getIn(['i18nState', 'translations'])
      } else {
        trans = {...state.i18nState.translations}
      }
      trans[language] = translations
      dispatch(updateTranslations(trans))
      dispatch(setForceRefresh(true))
    }
  }
}

export function setForceRefresh(force) {
  return { type: 'REDUX_I18N_SET_FORCE_REFRESH', force}
}
