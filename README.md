# Description

**redux-i18n** is a simple and powerful package for translate your *react* applications using *react-redux*.

[![redux-i18n in Travis](https://travis-ci.org/APSL/redux-i18n.svg?branch=master)](https://travis-ci.org/APSL/redux-i18n)
[![npm version](https://badge.fury.io/js/redux-i18n.svg)](https://www.npmjs.com/package/redux-i18n)
![downloads](https://img.shields.io/npm/dm/redux-i18n.svg)

## Install

```
npm i redux-i18n --save
```

## Features

* Translate literals.
* Designed for react-redux.
* Compatible with Immutable.js.
* Export translations to POT files (for translate with Poedit).
* Import translations from .PO files to *translations.js* object (for use in your project).
* Add comments for translators.
* Pluralize literals.

## Requirements

* node >= 4.0.0

## Usage

The package provide a parent component for encapsulate your application and provide features for translate your project.

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

## Redux Reducer

In your *combineReducers* you should add this **i18nState** reducer.

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

Already you can connect *lang* attribute in your component:

```javascript
export default connect(state => ({
  lang: state.i18nState.lang,
}))(Home)
```

## Translate literals

You can access to *I18n's* functions using your component's context. For example:

```javascript
Home.contextTypes = {
  t: React.PropTypes.func.isRequired
}
```

...then, you will can use *i18n* method in your component.

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
                        "This is a comment for translator.")}
        {this.context.t("Hello {n}!", {n: "Cesc"},
                        "An another comment.")}
      </div>
    )
}
```

See how *Poedit* show the comments.

![Poedit screenshot](imgs/poedit1.jpg?raw=true "Poedit screenshot")

## Stateless components

Example:

```javascript
const Foo = ({}, context) => <h1>{context.t("Hello World")}</h1>
```

## Pluralize

For use plurals in your translations.

```javascript
<div>{this.context.t(['una noche', '{n} noches', 'n'], {n: 1})}</div>
```

Instead pass a string as first parameter, you can pass a list. The first parameter is a singular text, the second one, a plural text and finally the attribute name of params dictionary which is used for set quantity.

After extract translations to POT file and open it with Poedit you will see the follow:

![Poedit screenshot](imgs/poedit2.jpg?raw=true "Poedit screenshot")

## Change language

Use *setLanguage* action.

```javascript
import {setLanguage} from "redux-i18n"

componentWillMount() {
    this.props.dispatch(setLanguage("es"))
}
```

If you work with combined languages like *es-ES*, *en-GB*, and you don't have those translations in your object...

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

Don't worry because *redux-i18n* will take fallback language content. In this case, *es* or *en*.

## Extract/Import scripts

Exists two scripts for extract texts to a template (template.pot) and use in *Poedit* and import texts from *po* files to a *translation.js*.

Add this scripts in your *package.json* for this purpose:

```json
    "scripts": {
        "extract": "i18n_extract",
        "import": "i18n_import"
    }
```

Then you will can run the follow commands in your terminal:

```
npm run extract
npm run import
```

### Extract texts and build template.pot

```
npm run extract
```

This script search all literals inside **src** folder with a regular expression and build a **locales/template.pot** file. This file can be used in [Poedit](https://poedit.net/) for build *en.po*, *es.po*, etc. files.

You will should save your *po* files inside *locales* folder.

If you want to set other source folder, you can use the *source* parameter.

```json
    "scripts": {
        "extract": "i18n_extract --source=mysourcefolder",
        "import": "i18n_import"
    }
```

Or if you want to set other *locales* folder...

```json
    "scripts": {
        "extract": "i18n_extract --source=mysourcefolder --locales=mylocalesfolder",
        "import": "i18n_import"
    }
```

The default regular expression pattern search all occurrences of *this.context.t* string, but if you want to use your custom pattern, see this example:

```javascript
export default function App({aProp, bProp}, {t: translate}) {
    return <div>{translate('Hello world!')}</div>;
}
```

Update your *package.json*:

```json
    "scripts": {
        "extract": "i18n_extract --pattern=translate",
        "import": "i18n_import"
    }
```

### Import .po files

Finally, when your translator have finished all translations you'll should import *po* files in your project. Run:

```
npm run import
```

This script read all *po* files inside your *locales* folder, extract all translations and build a **src/translations.js** that you will can use in your project.

You can set other *locales* folder:

```json
    "scripts": {
        "extract": "i18n_extract --source=mysource --locales=mylocales",
        "import": "i18n_import --locales=mylocales"
    }
```

If you want to save *translation.js* file in other folder:

```json
    "scripts": {
        "extract": "i18n_extract --source=mysource --locales=mylocales",
        "import": "i18n_import --locales=mylocales --translations=myfolder"
    }
```

**Please**: Don't forget to rate my project if you like it. Click on star!