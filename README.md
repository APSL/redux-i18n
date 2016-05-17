# Description

**redux-i18n** is a simple and powerful package for translate your *react* application with *react-redux*.

## Install

```
npm i redux-i18n --save
```

## How to use

This package provide a parent component that encapsulate your application. See this example for understand it.

```javascript
import I18n from "redux-i18n"
import {translations} from "./translations"

class MainApp extends React.Component {
  render() {
    return (
      <I18n translations={translations}>
        {this.props.children}
      </I18n>
    )
  }
}
```

Where *translations* is a dictionary as this:

```javascript
export const translations = {
  es: {
    "Translate this text": "Traduce este texto",
    "Hello {n}!": "Hola {n}!",
  }
}
```

You should have a *session reducer* with a *lang* attribute. As this:

```javascript
const sessionState = {
  lang: "es"
}

export function session(state=sessionState, action) {
  switch (action.type) {
    case "SESSION_SET_LANGUAGE":
      return {...state, lang: action.lang}
    default:
      return state
  }
}
```

*I18n* component is connected to *session.lang* reducer and listen when language change for redraw components.

## Translating content

You can access to a *I18n's* functions and attributes with your component's context. For example:

```javascript
Home.contextTypes = {
  t: React.PropTypes.func.isRequired,
  currentLang: React.PropTypes.string.isRequired
}
```

And then, you can use *i18n* function or *currentLang* attribute in you render method.

```javascript
render() {
    return (
      <div>
        <strong>Your current language, is: {this.context.currentLang}</strong><br/>
        {this.context.t("Translate this text")}<br/>
        {this.context.t("Hello {n}!", {n: "Cesc"})}<br/><br/>
        <button onClick={this.changeLanguage.bind(this)}>Change Language</button>
      </div>
    )
}
```
## Using the scripts

This package have two scripts for extract texts to a *template.pot* and import texts from *po* file to a *translation.js* file.

For use this scripts, you should edit your *package.json* and add both scripts.

```json
    "scripts": {
        "extract": "i18n_extract",
        "import": "i18n_import"
    }    
```

In this example I have used *extract* and *import* name for scripts, but you can use any. For run one of any scripts:

```
npm run extract
npm run import
```

## Extract texts and generate template.pot

```
npm run extract
```

This script search all results with a regular expression and generate a *locales/template.pot* file. This file can be used with [Poedit](https://poedit.net/) application for generate *en.po*, *es.po*, etc. files.

You should save your *po* files inside *locales* folder.

## Import your po files

```
npm run import
```

This script load all po files inside you *locales* folder, extract all translations and build a *translations.js* that you will use in your application.

