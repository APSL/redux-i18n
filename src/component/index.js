/*
 * Project: redux-i18n
 * File: component/index.js
 */

import {connect} from 'react-redux'
import I18n from './component'

export default connect(state => ({
  lang: state.i18nState.lang,
  newFallbackLang: state.i18nState.newFallbackLang,
  translations_reducer: state.i18nState.translations,
  forceRefresh: state.i18nState.forceRefresh
}))(I18n)
