/*
 * Project: redux-i18n
 * File: index.js
 */

export default from './component'
export Message from './message'
export PluralMessage from './plural-message'
export {i18nState} from './reducer'
export {setLanguage, setTranslations} from './actions'
export localize from './hoc'
export getTranslateFunction from './getTranslateFunction';
