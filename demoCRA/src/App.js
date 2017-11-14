import React, { Component } from "react"
import { Provider } from "react-redux"

import I18n from "redux-i18n"

import { store } from "./store"
import { translations } from "./translations"

import Main from "./Main"
import MainReducer from "./MainReducer"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          {/* Get translations from file*/}
          <I18n translations={translations}>
            <Main />
          </I18n>
          {/* Get translations from store via reducer*/}
          <I18n translations={{}} useReducer={true}>
            <MainReducer />
          </I18n>
        </div>
      </Provider>
    )
  }
}

export default App
