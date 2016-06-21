/*
 * Project: redux-i18n
 * File: reducer.js
 */

const reduxI18nState = {
  lang: 'en'
}

export function i18nState(state = reduxI18nState, action) {
  switch (action.type) {
    case 'REDUX_I18N_SET_LANGUAGE':
        return {...state, lang: action.lang}
    default:
        return state
  }
}


