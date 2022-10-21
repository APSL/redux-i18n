import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import { describe, before, it } from 'mocha'
import expect from 'expect'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import I18n from '../dist/component'
import { i18nState } from '../dist/reducer'
import { setLanguage } from '../dist/actions'

import TransWithoutParams from './components/TransWithoutParams'

const translations = {
  es: {
    Hello: 'Hola'
  },
  en: {},
  de: {
    Hello: 'Hallo'
  },
  options: {
    suppress_warnings: true
  }
}

describe('fallback language', function () {
  before('rendering component', function () {
    this.store = createStore(combineReducers({ i18nState }), applyMiddleware(thunk))

    this.component = ReactDOM.findDOMNode(
      TestUtils.renderIntoDocument(
        <Provider store={this.store}>
          <I18n translations={translations} fallbackLang="de" initialLang="en">
            <TransWithoutParams />
          </I18n>
        </Provider>
      )
    )
  })

  it('checking language', function () {
    expect(this.store.getState().i18nState.lang).toEqual('en')
    expect(this.component.textContent).toEqual('Hallo')
    this.store.dispatch(setLanguage('es'))
    expect(this.component.textContent).toEqual('Hola')
    this.store.dispatch(setLanguage('fr'))
    expect(this.component.textContent).toEqual('Hallo')
  })
})
