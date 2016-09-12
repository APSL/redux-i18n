/*
 * Project: redux-i18n
 * File: reducer/immutable.js
 */

import { Map } from 'immutable';

const reduxI18nState = new Map({
  lang: 'en'
})

export function i18nState(state = reduxI18nState, action) {
  switch (action.type) {
    case 'REDUX_I18N_SET_LANGUAGE':
        return state.set('lang', action.lang)
    default:
        return state
  }
}
