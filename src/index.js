/*
 * Project: redux-i18n
 * File: index.js
 */

export default from './component';
export {
  default as I18nContextProvider,
  I18nContext
} from './component/contextProvider';

export {i18nState} from './reducer';
export {setLanguage, setTranslations} from './actions';
export localize from './hoc';
export getTranslateFunction from './getTranslateFunction';
