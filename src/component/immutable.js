/*
 * Project: redux-i18n
 * File: component/immutable.js
 */

import {connect} from 'react-redux'
import I18n from './component'

export default connect(state => ({
  lang: state.getIn(['i18nState', 'lang'])
}))(I18n)
