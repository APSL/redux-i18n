
import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import {store} from './store'

import I18n from 'redux-i18n'
import {translations} from './translations'

import Main from './main'

let Demo = () => {
  return (
    <Provider store={store}>
      <I18n translations={translations}>
        <Main/>
      </I18n>
    </Provider>
  )
}

ReactDOM.render(<Demo/>, document.getElementById('demo'))
