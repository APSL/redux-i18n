import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import TestUtils from 'react-addons-test-utils'
import {Provider} from 'react-redux'

import I18n from '../dist/component'
import {i18nState} from '../dist/reducer'
import {setLanguage} from '../dist/actions'
import TransWithoutParams from './components/TransWithoutParams'
import TransWithParams from './components/TransWithParams'
import TransWithDollarSignParams from './components/TransWithDollarSignParams'
import TransWithNumberParams from './components/TransWithNumberParams'
import TransWithJunkParams from './components/TransWithJunkParams'
import Dates from './components/Dates'
import {TransPluralize1, TransPluralize2} from './components/TransPlurals'

const translations = {
  'es': {
    'Hello': 'Hola',
    'Hello {name}!': 'Hola {name}!',
    'YYYY-MM-DD': 'DD/MM/YYYY'
  },
  'en': {
    'una noche': 'one night',
    '{n} noches': '{n} nights'
  },
  'de-DE': {
    'Hello': 'Hallo'
  }
}

describe('component test', function() {
  before('prepare store and component', function() {

    this.store = createStore(
      combineReducers({i18nState}),
      applyMiddleware(thunk)
    )

    this.withoutParamsNode = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={translations}>
          <TransWithoutParams/>
        </I18n>
      </Provider>
    ))

    this.withParamsNode = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={translations}>
          <TransWithParams/>
        </I18n>
      </Provider>
    ))

    this.withDollarSignParamsNode = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={translations}>
          <TransWithDollarSignParams/>
        </I18n>
      </Provider>
    ))

    this.withNumberParamsNode = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={translations}>
          <TransWithNumberParams/>
        </I18n>
      </Provider>
    ))

    this.withJunkParamsNode = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={translations}>
          <TransWithJunkParams/>
        </I18n>
      </Provider>
    ))

    this.dates = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={translations}>
          <Dates/>
        </I18n>
      </Provider>
    ))

    this.pluralize1 = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={translations}>
          <TransPluralize1/>
        </I18n>
      </Provider>
    ))

    this.pluralize2 = ReactDOM.findDOMNode(TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={translations}>
          <TransPluralize2/>
        </I18n>
      </Provider>
    ))

  })

  it('initial state', function() {
    expect(this.store.getState().i18nState).toExist()
    expect(this.store.getState().i18nState.lang).toEqual('en')
  })

  it('text without params', function() {
    expect(this.withoutParamsNode.textContent).toEqual('Hello')
  })

  it('changing language in text without params', function() {
    this.store.dispatch(setLanguage('es'))
    expect(this.withoutParamsNode.textContent).toEqual('Hola')
  })

  it('text with params', function() {
    this.store.dispatch(setLanguage('en'))
    expect(this.withParamsNode.textContent).toEqual('Hello Francesc!')
  })

  it('text with dollar signs', function() {
    expect(this.withDollarSignParamsNode.textContent).toEqual('We should have two dollar signs $$!')
  })

  it('text with number params', function() {
    expect(this.withNumberParamsNode.textContent).toEqual('13 things!')
  })

  it('text with junk params', function() {
    expect(this.withJunkParamsNode.textContent).toEqual('undefined, null, and false as strings')
  })

  it('changing language in text with params', function() {
    this.store.dispatch(setLanguage('es'))
    expect(this.withParamsNode.textContent).toEqual('Hola Francesc!')
  })

  it('date format', function() {
    this.store.dispatch(setLanguage('en'))
    expect(this.dates.textContent).toEqual('2016-01-01')
    this.store.dispatch(setLanguage('es'))
    expect(this.dates.textContent).toEqual('01/01/2016')
  })

  it('pluralize', function() {
    this.store.dispatch(setLanguage('es'))
    expect(this.pluralize1.textContent).toEqual('una noche')
    expect(this.pluralize2.textContent).toEqual('5 noches')
    this.store.dispatch(setLanguage('en'))
    expect(this.pluralize1.textContent).toEqual('one night')
    expect(this.pluralize2.textContent).toEqual('5 nights')
  })

  it('de-DE', function() {
    this.store.dispatch(setLanguage('de-DE'))
    expect(this.store.getState().i18nState.lang).toEqual('de-DE')
    expect(this.withoutParamsNode.textContent).toEqual('Hallo')
  })

})
