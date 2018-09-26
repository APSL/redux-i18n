/*
 * Project: redux-i18n
 * File: component/immutable.js
 */

import {connect} from 'react-redux'
import I18n from './component'

export default connect(state => ({
  lang: state.getIn(['i18nState', 'lang']),
  newFallbackLang: state.getIn(['i18nState', 'newFallbackLang']),
  translations_reducer: state.getIn(['i18nState', 'translations']),
  forceRefresh: state.getIn(['i18nState', 'forceRefresh'])
}))(I18n)
