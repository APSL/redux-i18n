import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import {describe, before, it} from 'mocha'
import expect from 'expect'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import I18n from '../dist/component'
import {i18nState} from '../dist/reducer'
import {setLanguage, setTranslations} from '../dist/actions'

import TransWithoutParams from './components/TransWithoutParams'

describe('translations in reducer', function() {
  before('rendering component', function() {
    this.store = createStore(
      combineReducers({i18nState}),
      applyMiddleware(thunk)
    )

    this.component = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={{}} useReducer={true}>
          <TransWithoutParams/>
        </I18n>
      </Provider>
    ))

  })

  it('set all translations object', function() {
    expect(this.store.getState().i18nState.translations).toEqual({})
    this.store.dispatch(setLanguage('es'))
    expect(this.component.textContent).toEqual('Hello')

    const trans = {
      'es': {
        'Hello': 'Hola'
      }
    }

    this.store.dispatch(setTranslations(trans))
    expect(this.store.getState().i18nState.translations.es['Hello']).toEqual('Hola')
    expect(this.component.textContent).toEqual('Hola')
  })

  it('add only one new language in translations', function() {
    const trans = {
      'es': {
        'Hello': 'Hola'
      }
    }
    this.store.dispatch(setTranslations(trans))
    expect(this.store.getState().i18nState.translations).toEqual(trans)
    this.store.dispatch(setLanguage('es'))
    expect(this.component.textContent).toEqual('Hola')

    this.store.dispatch(setLanguage('de'))
    expect(this.component.textContent).toEqual('Hello')

    this.store.dispatch(setTranslations({'Hello': 'Hallo'}, 'de'))
    expect(this.component.textContent).toEqual('Hallo')
  })

  describe('options', function() {
    it('add only one new language in translations', function() {
      const trans = {
        'es': {
          'Hello': 'Hola'
        }
      }
      this.store.dispatch(setTranslations(trans))
      this.store.dispatch(setLanguage('de'))
      this.store.dispatch(setTranslations({'Hello': 'Hallo'}, {language: 'de'}))
      expect(this.component.textContent).toEqual('Hallo')
    });
    
    it('preserve existing translations', function() {
      const trans = {
        'es': {
          'Hello': 'Hola'
        }
      }

      const newTranslations = {
        'de': {
          'Hello': 'Hallo'
        }
      }
      this.store.dispatch(setTranslations(trans))
      this.store.dispatch(setTranslations(newTranslations, {preserveExisting: true}))
      this.store.dispatch(setLanguage('es'))
      expect(this.component.textContent).toEqual('Hola')
      this.store.dispatch(setLanguage('de'))
      expect(this.component.textContent).toEqual('Hallo')
    });

    it('preserve translations in only one language', function() {
      const trans = {
        'es': {
          'Hello': 'Hola'
        }
      }

      const newTranslations = {
        'Goodbye': 'Adiós'
      }

      this.store.dispatch(setTranslations(trans))
      this.store.dispatch(setTranslations(newTranslations, {language: 'es', preserveExisting: true}))
      expect(this.store.getState().i18nState.translations['es']).toEqual({
        'Hello': 'Hola',
        'Goodbye': 'Adiós'
      })
    })
  })

})
