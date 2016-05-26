import React from "react"
import ReactDOM from 'react-dom';
import expect from "expect"
import {createStore, applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk"
import promiseMiddleware from "redux-promise-middleware"
import TestUtils from 'react-addons-test-utils';
import {Provider} from "react-redux"

import I18n from '../src/component';
import {i18nState} from "../src/reducer"
import {setLanguage} from "../src/actions"
import TransWithoutParams from "./components/TransWithoutParams"
import TransWithParams from "./components/TransWithParams"

const translations = {
  es: {
    "Hello": "Hola",
    "Hello {name}!": "Hola {name}!"
  },
  en: {
    "Hello": "Hello"
  }
}

describe("component test", function() {
  before("prepare store and component", function() {

    this.store = createStore(
      combineReducers({i18nState}),
      applyMiddleware(
        thunk
      )
    )

    this.withoutParams = TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={translations}>
          <TransWithoutParams/>
        </I18n>
      </Provider>
    )
    this.withoutParamsNode = ReactDOM.findDOMNode(this.withoutParams)

    this.withParams = TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={translations}>
          <TransWithParams/>
        </I18n>
      </Provider>
    )
    this.withParamsNode = ReactDOM.findDOMNode(this.withParams)
  })

  it("initial state", function() {
    expect(this.store.getState().i18nState).toExist()
    expect(this.store.getState().i18nState.lang).toEqual("en")
  })

  it("text without params", function() {
    expect(this.withoutParamsNode.textContent).toEqual("Hello")
  })

  it("changing language in text without params", function() {
    this.store.dispatch(setLanguage("es"))
    expect(this.withoutParamsNode.textContent).toEqual("Hola")
  })

  it("text with params", function() {
    this.store.dispatch(setLanguage("en"))
    expect(this.withParamsNode.textContent).toEqual("Hello Francesc!")
  })

  it("changing language in text with params", function() {
    this.store.dispatch(setLanguage("es"))
    expect(this.withParamsNode.textContent).toEqual("Hola Francesc!")
  })
})
