# Description

**redux-i18n** is a simple yet powerful package to translate your *react* applications using *react-redux*.

[![redux-i18n in Travis](https://travis-ci.org/APSL/redux-i18n.svg?branch=master)](https://travis-ci.org/APSL/redux-i18n)
[![npm version](https://badge.fury.io/js/redux-i18n.svg)](https://www.npmjs.com/package/redux-i18n)
![downloads](https://img.shields.io/npm/dm/redux-i18n.svg)

## Installation

```
npm i redux-i18n --save
```

or 

```
yarn add redux-i18n
```

## Features

* Translate literals.
* Pluralize literals.
* Designed for react-redux.
* Compatible with Immutable.js.
* Export translations to POT files (make your translations with [Poedit](https://poedit.net/)).
* Import translations from .PO files to *translations.js* object (for use in your project).
* Add comments for translators.

## Requirements

* node >= 4.0.0

## Overview

**redux-i18n** offers your app the `t()` function to translate literals.

The `t()` function is available in the components of your app via React [context](https://reactjs.org/docs/context.html). To achieve this you need to wrap your app into the `<I18n />` component from **redux-i18n** that provides for the context. Furthermore, for all components that want to use the `t()` function you need to define `contextTypes`, e.g.:

```javascript
// import ...
import PropTypes from 'prop-types'

class MyComponent extends React.Component {
  render() {
    return <div>{this.context.t("Hello World!")}</div>
  }
}

MyComponent.contextTypes = {
  t: PropTypes.func
}
```

If `contextTypes` is not defined, then context will be an empty object.

The `t()` function takes up to three arguments `t(textKey [, params, comments])`, where `textKey` is either the string to be translated or --- for pluralization --- an object as defined below.

For setting the language in the redux store **redux-i18n** offers an action creator `setLanguage`.

To manage the translations in your React app, **redux-i18n** supports two choices: 

1. load all your translations into a one big JS object
1. load your translations into a slice of your redux store

For the latter **redux-i18n** provides an action function creator `setTranslations`. As `setTranslations` is an action function creator you need to add *redux-thunk* to your middleware for it to work.

**redux-i18n** supports your store in plain JavaScript structures, but also if it is managed by help of *immutable.js*.

Finally, **redux-i18n** offers scripts to generate a translations object from po files that can be managed in [Poedit](https://poedit.net/).


## Usage

The package provides a parent component to encapsulate your application as well as helpers functions to translate your project.

```javascript
// import ... 
import I18n from "redux-i18n"
// with Immutable.js:
import I18n from "redux-i18n/immutable"

import {translations} from "./translations"

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <I18n translations={translations}>
          <App />
        </I18n>
      </Provider>
    )
  }
}
```

Where `translations` is a dictionary similar to this:

```javascript
export const translations = {
  "es": {
    "Translate this text": "Traduce este texto",
    "Hello {n}!": "Hola {n}!",
  }
}
```

You can also set the initial language with the *initialLang* prop:

```javascript
<I18n translations={translations} initialLang="es">
  <div>
    <h1>My Project</h1>
    {this.props.children}
  </div>
</I18n>
```

If you have partial translations, this means that you don't have your translations at 100% and you want to show untranslated literals in an other language, you can use the `fallbackLang` prop.

```javascript
<I18n translations={translations} initialLang="de" fallbackLang="en">
  <div>
    <h1>My Project</h1>
    {this.props.children}
  </div>
</I18n>
```

In this case, if you want to show this translations:

```html
<div>{this.context.t('_hello_')}</div>
```

And this isn't in "de" language, it will show in "en".

## Redux Reducer

The language state is managed in a slice of the store named `i18nState`. Therefore, you have to add the **i18nState** reducer in your `combineReducers`.

```javascript
import {otherreducers} from "./Yourproject"

import {i18nState} from "redux-i18n"
// with Immutable.js:
import {i18nState} from "redux-i18n/immutable"

const appReducer = combineReducers({
  otherreducers,
  i18nState
})
```

The current language is contained in the `lang` key of `i18nState`.

The `i18nState` is initially defined as

```javascript
const defaultI18nState = {
  lang: 'en',
  translations: {},
  forceRefresh: false
}

// immutablejs
const defaultI18nState = new Map({
  lang: 'en',
  translations: {},
  forceRefresh: false
})
```

When you [map your state to props with connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) you can also access the `lang` attribute in your components:

```javascript
export default connect(state => ({
  lang: state.i18nState.lang,
}))(Home)

// with Immutable.js:
export default connect(state => ({
  lang: state.getIn(['i18nState', 'lang']),
}))(Home)

```

## Translate literals

You can access the functions of `<I18n />` using your component's context. For example:

```javascript
Home.contextTypes = {
  t: PropTypes.func.isRequired
}
```

...you will then be able to use the `t()` method in your component.

```javascript
render() {
  return (
    <div>
      <strong>Your current language, is: {this.props.lang}</strong><br/>
      {this.context.t("Translate this text")}<br/>
      {this.context.t("Hello {n}!", {n: "World"})}<br/><br/>
      <button onClick={this.changeLanguage.bind(this)}>Change Language</button>
    </div>
  )
}
```

You can also use the `t()` function to change date formats

```javascript
export const translations = {
  "de": {
    "YYYY-MM-DD": "DD.MM.YYYY"
  }
}
```


```javascript
render() {
  let today = moment()
  return (
    <div>
      {today.format(this.context.t("YYYY-MM-DD"))}
    </div>
  )
}
```

Add comments for translators.

```javascript
render() {
  return (
    <div>
      {this.context.t("Translate this text", {},
                      "This is a comment for translators.")}
      {this.context.t("Hello {n}!", {n: "Cesc"},
                      "This is another comment.")}
    </div>
  )
}
```

Here's how *Poedit* will show the comments:

![Poedit screenshot](imgs/poedit1.jpg?raw=true "Poedit screenshot")

### HTML Object as parameter

```javascript
const user = {name: 'World'}
const name = <span>{user.name}</span>
return <div dangerouslySetInnerHTML={{ __html: context.t('Hello {name}', {name: name}) }}/>
```

Result:

```html
Hello <span>Cesc</span>
```

Notice that for [security reasons](https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml) we can't print html code directly, which is why we need to use the "dangerouslySetInnerHTML" method for that.

## Stateless components

Example:

```javascript
const Foo = ({}, context) => <h1>{context.t("Hello World")}</h1>
```

## Pluralize

To use plurals in your translations.

```javascript
<div>{this.context.t(['una noche', '{n} noches', 'n'], {n: 1})}</div>
```

Pass an array instead of a string as first parameter. The first element is a singular term, the second is the plural form and the last one is an object used to set the quantity.

After extracting the translations to a POT file and opening it with Poedit you will see the following:

![Poedit screenshot](imgs/poedit2.jpg?raw=true "Poedit screenshot")

Also the `translations` object allows to set an options node. There you can set a plurals form rule and a plurals number. For example:

```javascript
export const translations = {
  "es": {
    "Translate this text": "Traduce este texto",
    "Hello {n}!": "Hola {n}!",
  },
  "options": {
    "plural_rule": "n > 1",
    "plural_number": "2",
  }
}
```

When the translations are generated from po import file, this node is created automatically.

*Note*: Versions >=1.5.10 allow to use all existing pluralization rules:
[http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html)

## Change language

Use the *setLanguage* action.

```javascript
import {setLanguage} from "redux-i18n"

componentWillMount() {
  this.props.dispatch(setLanguage("es"))
}
```

If you work with combined languages like `"es-ES"`, `"en-GB"`, but your translations object doesn't include those properties...

```javascript
export const translations = {
  "es": {
    ...
  },
  "en": {
    ...
  }
}
```

...*redux-i18n* will fallback on the closest property. In this case, `"es"` or `"en"`.

## Extract/Import scripts

**redux-i18n** includes a script to extract your translation strings to a *.pot* template which you can use in *Poedit*, and another to import strings from *po* files to a `translation.js`.

Add the scripts in your *package.json* for this purpose:

```json
"scripts": {
  "extract": "i18n_extract",
  "import": "i18n_import"
}
```

You can then run the following commands in your terminal:

```
npm run extract
npm run import
```

### Extract texts and build template.pot

```
npm run extract
```

By default, this script will search for all literals inside your **src** folder with a regular expression and build a **locales/template.pot** file. This file can then be used in [Poedit](https://poedit.net/) to build *en.po*, *es.po*, etc. files.

If you want to set other source folder, you can use the `--source` switch.

```json
"scripts": {
  "extract": "i18n_extract --source=mysourcefolder",
  "import": "i18n_import"
}
```

Or if you want to export your locales to a different folder...

```json
"scripts": {
  "extract": "i18n_extract --source=mysourcefolder --locales=mylocalesfolder",
  "import": "i18n_import"
}
```

By default this command find in all *.js* and *.jsx* file extensions, but you can customize it with *fexts* parameter. Check out this example:

```json
"scripts": {
  "extract": "i18n_extract --fexts=js,jsx,coffee",
  "import": "i18n_import"
}
```

The default regular expression will search all occurrences of `this.context.t` string, but you can also supply your own custom pattern, as in the following example:

```javascript
export default function App({aProp, bProp}, {t: translate}) {
  return <div>{translate('Hello world!')}</div>;
}
```

You will then need to set the `--pattern` flag in *package.json*:

```json
"scripts": {
  "extract": "i18n_extract --pattern=translate",
  "import": "i18n_import"
}
```

### Import .po files

When your translators are done translating your terms, you can import your *po* files running the import script:

```
npm run import
```

This script read all *po* files inside your *locales* folder, extract all translations and build a **src/translations.js** that you can then use in your project.
 
Your *.po* files must define header language, check [mininal format](https://gist.github.com/Salec/3ddcf037e9cc4c44082441f379bf0165) for more information. 

You can also set another *locales* folder:

```json
"scripts": {
  "extract": "i18n_extract --source=mysource --locales=mylocales",
  "import": "i18n_import --locales=mylocales"
}
```

Or, save *translation.js* to a different location:

```json
"scripts": {
  "extract": "i18n_extract --source=mysource --locales=mylocales",
  "import": "i18n_import --locales=mylocales --translations=myfolder"
}
```

You can also change the encoding for your extraction from PO (default is iso-8859-1)
```json
"scripts": {
  "extract": "i18n_extract --source=mysource --locales=mylocales",
  "import": "i18n_import --encoding=utf-8"
}
```

## Async translations

When applications grow, translations tend to bigger as well, adding a lot to the overall size of the js bundle.

You can set an empty translations object to the `<I18n/>` component and set the `useReducer` prop to true to use the store as the source of strings. For example:

```javascript
<Provider store={this.store}>
  <I18n translations={{}} useReducer={true}>
    <MainApp/>
  </I18n>
</Provider>
```

Then you can use the `setTranslations` action.

```javascript
import {setTranslations} from 'redux-i18n'
api.get('...').then(r => this.props.dispatch(setTranslations(r.translations)))
```

You can pass a second parameter to the action to set the language.
Depending on your response's structure, it could look like this:

```javascript
api.get('...').then(r => this.props.dispatch(setTranslations(r.translations, 'en')))
```

Since version 1.5.1 is possible pass a dictionary as a second param with some options. This allows us set more functionalities to method.

- preserveExisting (bool): If is true, the translations received does merge with existing translations.
- language (string): Language code

Some examples:

```javascript
setTranslations(newTranslations, {preserveExisting: true})
setTranslations({'Hello': 'Hallo'}, {language: 'de'})
```

## InitialState

Sometimes language is set initially by the redux store creation, or in an isomorphic way. In this case, you can set the `initialized` prop to stop the `I18n` provider from dispatching an action.

## HOC

If you want to isolate the use of context from your components, you can import the Localize Hoc to provide the translate function as a prop to your component. For example:

```javascript
import { localize } from 'redux-i18n'

class SomeComponent extends Component {
  render() {
    return this.props.t('hello world')
  }
}

export default localize()(SomeComponent)
```

You can also change the name of the provided prop:

```javascript
import { localize } from 'redux-i18n'

class SomeComponent extends Component {
  render() {
    return this.props.translate('hello world')
  }
}

export default localize('translate')(SomeComponent)
```

---

**Please**, if you like my package, don't forget to rate it. Click on the "star"!
