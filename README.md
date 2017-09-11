# Description

**redux-i18n** is a simple yet powerful package to translate your *react* applications using *react-redux*.

[![redux-i18n in Travis](https://travis-ci.org/APSL/redux-i18n.svg?branch=master)](https://travis-ci.org/APSL/redux-i18n)
[![npm version](https://badge.fury.io/js/redux-i18n.svg)](https://www.npmjs.com/package/redux-i18n)
![downloads](https://img.shields.io/npm/dm/redux-i18n.svg)

## Installation

```
npm i redux-i18n --save
```

## Features

* Translate literals.
* Designed for react-redux.
* Compatible with Immutable.js.
* Export translations to POT files (make your translations with Poedit).
* Import translations from .PO files to *translations.js* object (for use in your project).
* Add comments for translators.
* Pluralize literals.

## Requirements

* node >= 4.0.0

## Usage

The package provides a parent component to encapsulate your application as well as helpers functions to translate your project.

```javascript
import I18n from "redux-i18n"
// with Immutable.js:
import I18n from "redux-i18n/immutable"

import {translations} from "./translations"

class MainApp extends React.Component {
  render() {
    return (
      <I18n translations={translations}>
        <div>
            <h1>My Project</h1>
            {this.props.children}
        </div>
      </I18n>
    )
  }
}
```

Where *translations* is a dictionary similar to this:

```javascript
export const translations = {
  "es": {
    "Translate this text": "Traduce este texto",
    "Hello {n}!": "Hola {n}!",
  }
}
```

Also you can set initial language with *initialLang* attribute:

```javascript
<I18n translations={translations} initialLang="es">
    <div>
        <h1>My Project</h1>
        {this.props.children}
    </div>
</I18n>
```

If you have partial translations, this means that you don't have your translations at 100% and you want to show untranslated literals in other language, you can use fallbackLang.

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

You'll need to add the **i18nState** reducer in your *combineReducers*.

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

This allows you to access the *lang* attribute in your component, which contains the current language:

```javascript
export default connect(state => ({
  lang: state.i18nState.lang,
}))(Home)
```

## Translate literals

You can access *I18n's* functions using your component's context. For example:

```javascript
Home.contextTypes = {
  t: React.PropTypes.func.isRequired
}
```

...you will then be able to use the *t* method in your component.

```javascript
render() {
    return (
      <div>
        <strong>Your current language, is: {this.props.lang}</strong><br/>
        {this.context.t("Translate this text")}<br/>
        {this.context.t("Hello {n}!", {n: "Cesc"})}<br/><br/>
        <button onClick={this.changeLanguage.bind(this)}>Change Language</button>
      </div>
    )
}
```

Translate date formats.

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
const user = {name: 'Cesc'}
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

## Change language

Use the *setLanguage* action.

```javascript
import {setLanguage} from "redux-i18n"

componentWillMount() {
    this.props.dispatch(setLanguage("es"))
}
```

If you work with combined languages like *es-ES*, *en-GB*, but your translations object doesn't include those properties...

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

...*redux-i18n* will fallback on the closest property. In this case, *es* or *en*.

## Extract/Import scripts

*redux-i18n* includes a script to extract your translation strings to a .pot template which you can use in *Poedit*, and another to import strings from *po* files to a *translation.js*.

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

If you want to set other source folder, you can use the *source* parameter.

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
        "extract": "i18n_extract --fexts=js,jsx,cofee",
        "import": "i18n_import"
    }
```

The default regular expression will search all occurrences of *this.context.t* string, but you can also supply your own custom pattern, as in the following example:

```javascript
export default function App({aProp, bProp}, {t: translate}) {
    return <div>{translate('Hello world!')}</div>;
}
```

You will then need to set the --pattern flag in *package.json*:

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

You can set an empty translations object to the `<i18n/>` component and set the *useReducer* prop to true to use the store as the source of strings. For example:

```javascript
    <Provider store={this.store}>
        <I18n translations={{}} useReducer={true}>
            <MainApp/>
        </I18n>
    </Provider>
```

Then you can use the *setTranslations* action.

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
