/*
 * Project: redux-i18n
 * File: actions.js
 */

export function setLanguage(lang) {
  return {type: 'REDUX_I18N_SET_LANGUAGE', lang}
}

export function setFallbackLanguage(fallbackLang) {
  return {type: 'REDUX_I18N_SET_FALLBACK_LANGUAGE', fallbackLang}
}

function updateTranslations(translations) {
  return {type: 'REDUX_I18N_SET_TRANSLATIONS', translations}
}


export function setTranslations(translations, languageOrOptions) {
  return function(dispatch, getState) {
    const options = typeof languageOrOptions === 'string'
      ? {language: languageOrOptions}
      : languageOrOptions || {}
    const {language, preserveExisting} = options
    const state = getState()
    let trans = null
    // Compatibility with immutable
    if (state.i18nState === undefined) {
      trans = state.getIn(['i18nState', 'translations'])
    } else {
      trans = {...state.i18nState.translations}
    }
    const newTranslations = language === undefined
      ? translations
      : {...trans, [language]: translations}
    dispatch(
      updateTranslations(
        preserveExisting
          ? Object.keys(newTranslations).reduce(
              (allTranslations, lang) => ({
                ...allTranslations,
                [lang]: {
                  ...allTranslations[lang],
                  ...newTranslations[lang]
                }
              }),
              trans
            )
          : newTranslations
      )
    )
    dispatch(setForceRefresh(true))
  }
}

export function setForceRefresh(force) {
  return { type: 'REDUX_I18N_SET_FORCE_REFRESH', force}
}
