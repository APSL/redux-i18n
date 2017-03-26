import React from 'react'

import {connect} from 'react-redux'

import {setLanguage} from 'redux-i18n'

class MainReducer extends React.Component {
  render() {
    return (
      <div>
        <h1>Async Translations</h1>
        Language: {this.props.lang}<br/>
      </div>
    )
  }
}

MainReducer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default connect(state => ({
  lang: state.i18nState.lang
}))(MainReducer)
