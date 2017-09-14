/*
 * Project: redux-i18n
 * File: getTranslateFunction.js
 */

import React from 'react'

const interpolateParams = (text, params) => {
  if (!params) {
    return text;
  }

  const children = text.split(/({[^}]+})/g)
    .map((child) => {
      const match = /{(.+)}/g.exec(child);
      if (match) {
        const param = params[match[1]];
        return param ? param : String(param)
      }

      return child;
    });

  // if any children are objects (i.e. react components), wrap in a span, otherwise return as string
  // ignore anything that is falsy, bypassing null, etc
  return children.some(child => child && typeof child === 'object')
    // When React 16 is released, change the span to an identity function for array children,
    // removing the extra dom node
    ? React.createElement('span', null, ...children)
    : children.join('');
}

const getLangMessages = (translations, lang) => {
  let langMessages = translations[lang];

  // Fall back lang
  if (langMessages === undefined && lang.indexOf('-') > -1) {
    langMessages = translations[lang.split('-')[0]]
  }

  return langMessages;
}

export default (translations, lang, fallbackLang) => {
  const langMessages = getLangMessages(translations, lang);
  const fallbackLangMessages = fallbackLang ? getLangMessages(translations, fallbackLang) : undefined;

  return (textKey, params, comment) => {

    // Checking if textkey contains a pluralize object.
    if (typeof textKey === 'object') {
      textKey = textKey[params[textKey[2]] === 1 ? 0 : 1]
    }

    if (!langMessages && !fallbackLangMessages) {
      return interpolateParams(textKey, params);
    }

    let message = langMessages ? langMessages[textKey] : undefined;
    if (message === undefined || message === '') {
      // If don't have literal translation and have fallback lang, try
      // to get from there.
      if (fallbackLangMessages) {
        let literal = fallbackLangMessages[textKey]
        if (literal !== undefined && literal !== '') {
          return interpolateParams(literal, params);
        }
      }
      return interpolateParams(textKey, params);
    }
    return interpolateParams(message, params);
  }
}
