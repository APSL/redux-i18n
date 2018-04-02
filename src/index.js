/*
 * Project: redux-i18n
 * File: index.js
 */

export default from './component';
export {I18nContext} from './contextProvider';
export {I18nContextProvider} from './contextProvider';

export {i18nState} from './reducer';
export {setLanguage, setTranslations} from './actions';
export localize from './hoc';
export getTranslateFunction from './getTranslateFunction';
