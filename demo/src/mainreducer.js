import React from 'react'
import {PropTypes} from 'prop-types'

import {connect} from 'react-redux'

import {setLanguage, setTranslations} from 'redux-i18n'

class MainReducer extends React.Component {

  constructor(props) {
    super(props)
    this.getRemoteTranslations = this.getRemoteTranslations.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(setLanguage('es'))
  }

  getRemoteTranslations() {
    this.props.dispatch(setTranslations({
      'es': {
        'Hello world!': 'Hola Mundo!'
      }
    }))
  }

  render() {
    return (
      <div>
        <h1>Async Translations</h1>
        Language: {this.props.lang}<br/>
        Translation: {this.context.t('Hello world!')}<br/>
        <button onClick={this.getRemoteTranslations}>Get remote translations</button><br/>
        <pre style={{ background: '#e9e9e9' }}>{JSON.stringify(this.props.translations)}</pre>
      </div>
    )
  }
}

MainReducer.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(state => ({
  lang: state.i18nState.lang,
  translations: state.i18nState.translations
}))(MainReducer)
