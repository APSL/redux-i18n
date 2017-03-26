import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import {describe, before, it} from 'mocha'
import expect from 'expect'
import {createStore, applyMiddleware} from 'redux'
import {combineReducers} from 'redux-immutablejs'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import I18n from '../immutable'
import {i18nState} from '../immutable'
import {setLanguage, setTranslations} from '../dist/actions'

import TransWithoutParams from './components/TransWithoutParams'

describe('translations in reducer (immutable)', function() {
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

  it('default component', function() {
    expect(this.store.getState().getIn(['i18nState', 'translations'])).toEqual({})
    this.store.dispatch(setLanguage('es'))
    expect(this.component.textContent).toEqual('Hello')

    const trans = {
      'es': {
        'Hello': 'Hola'
      }
    }

    this.store.dispatch(setTranslations(trans))
    expect(this.store.getState().getIn(['i18nState', 'translations'])['es']['Hello']).toEqual('Hola')
    expect(this.component.textContent).toEqual('Hola')
  })
})
