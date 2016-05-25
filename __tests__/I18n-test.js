jest.unmock('../src/component');
jest.unmock('./ComponentTest');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import promiseMiddleware from "redux-promise-middleware"

import I18n from '../src/component';
import {i18nState} from "../src/reducer"
import ComponentTest from "./ComponentTest"


/*****************************************************************************/
/* Translations definition
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
/* Test 1: Essentials tests...
/*****************************************************************************/
describe("I18n", () => {
  it("essentials tests", () => {

    const store = createStore(
      i18nState,
      applyMiddleware(
        thunk,
        promiseMiddleware
      )
    )

    const i18nComp = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <I18n translations={translations}>
          <ComponentTest/>
        </I18n>
      </Provider>
    )

    const i18nNode = ReactDOM.findDOMNode(i18nComp)
    expect(i18nNode.textContent).toEqual("Hello")

    // Try to change lang
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithTag(i18nComp, 'button')
    )

    expect(i18nNode.textContent).toEqual("Hola")
  })
})
