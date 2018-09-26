/*
 * Project: redux-i18n
 * File: index.js
 */

export default from './component'
export {i18nState} from './reducer'
export {setLanguage, setFallbackLanguage, setTranslations} from './actions'
export localize from './hoc'
export getTranslateFunction from './getTranslateFunction';
