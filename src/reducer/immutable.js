/*
 * Project: redux-i18n
 * File: reducer/immutable.js
 */

import { Map } from 'immutable';

const reduxI18nState = new Map({
  lang: 'en',
  newFallbackLang: null,
  translations: {},
  forceRefresh: false
})

export function i18nState(state = reduxI18nState, action) {
  switch (action.type) {
    case 'REDUX_I18N_SET_LANGUAGE':
      return state.set('lang', action.lang)
    case 'REDUX_I18N_SET_FALLBACK_LANGUAGE':
      return state.set('newFallbackLang', action.newFallbackLang)
    case 'REDUX_I18N_SET_TRANSLATIONS':
      return state.set('translations', action.translations)
    case 'REDUX_I18N_SET_FORCE_REFRESH':
      return state.set('forceRefresh', action.force)
    default:
        return state
  }
}
