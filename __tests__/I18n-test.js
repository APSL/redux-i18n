jest.unmock('../src/component');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import {combineReducers} from "redux"

import I18n from '../src/component';
import {i18nState} from "../src/reducer"


describe("I18n", () => {
  it("instantiate component", () => {

    const reducer = combineReducers({ i18nState })
    const store = createStore(reducer)

    const i18nComp = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <I18n/>
      </Provider>
    )

    // const i18nNode = ReactDOM.findDOMNode(i18nComp)
    //
    // console.log(i18nNode.textContent);
  })
})
