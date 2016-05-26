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
import ComponentTest from "./ComponentTest"

/*****************************************************************************/
/* Translations and Store...
/*****************************************************************************/
const translations = {
  es: {
    "Hello": "Hola"
  },
  en: {
    "Hello": "Hello"
  }
}

/*****************************************************************************/
/* Test 1: Essentials...
/*****************************************************************************/
describe("Component Test", function() {
  before("render element", function() {

    // Store
    const reducer = combineReducers({i18nState})
    this.store = createStore(
      reducer,
      applyMiddleware(
        thunk,
        promiseMiddleware
      )
    )

    this.i18nComp = TestUtils.renderIntoDocument(
      <Provider store={this.store}>
        <I18n translations={translations}>
          <ComponentTest/>
        </I18n>
      </Provider>
    )

    this.i18nNode = ReactDOM.findDOMNode(this.i18nComp)
  })

  it("initial state", function() {
    expect(this.store.getState().i18nState.lang).toEqual("en")
  })

  it("initial translation", function() {
    expect(this.i18nNode.textContent).toEqual("Hello")
  })

  it("changing language", function() {
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithTag(this.i18nComp, "button")
    )
    expect(this.store.getState().i18nState.lang).toEqual("es")
  })
})
