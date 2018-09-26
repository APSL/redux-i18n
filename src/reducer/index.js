/*
 * Project: redux-i18n
 * File: reducer/index.js
 */

const reduxI18nState = {
  lang: 'en',
  newFallbackLang: null,
  translations: {},
  forceRefresh: false
}

export function i18nState(state = reduxI18nState, action) {
  switch (action.type) {
    case 'REDUX_I18N_SET_LANGUAGE':
      return {...state, lang: action.lang}
    case 'REDUX_I18N_SET_FALLBACK_LANGUAGE':
      return {...state, newFallbackLang: action.newFallbackLang}
    case 'REDUX_I18N_SET_TRANSLATIONS':
      return {...state, translations: action.translations}
    case 'REDUX_I18N_SET_FORCE_REFRESH':
      return {...state, forceRefresh: action.force}
    default:
        return state
  }
}
