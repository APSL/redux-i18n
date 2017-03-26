
import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import {store} from './store'

import I18n from 'redux-i18n'
import {translations} from './translations'

import Main from './main'
import MainReducer from './mainreducer'

const Demo = () => {
  return (
    <Provider store={store}>
      <I18n translations={translations}>
        <Main/>
      </I18n>
    </Provider>
  )
}

const DemoReducer = () => {
  return (
    <Provider store={store}>
      <I18n translations={{}} useReducer={true}>
        <MainReducer/>
      </I18n>
    </Provider>
  )
}

ReactDOM.render(<Demo/>, document.getElementById('demo'))
ReactDOM.render(<DemoReducer/>, document.getElementById('demo-reducer'))
