import React, { Component } from "react"
import { Provider } from "react-redux"

import I18n, {I18nContextProvider, I18nContext} from "redux-i18n"

import { store } from "./store"
import { translations } from "./translations"

import Main from "./Main"
import MainNew from "./MainNew"

import MainReducer from "./MainReducer"

class App extends Component {
  render() {
    console.log(I18nContext, I18nContextProvider);
    return (
      <Provider store={store}>
        <div>
          <I18nContextProvider translations={translations}>
            <MainNew />
          </I18nContextProvider>
          {/* Get translations from file*/}

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
