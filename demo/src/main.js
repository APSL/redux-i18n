import React from 'react'
import {PropTypes} from 'prop-types'

import {connect} from 'react-redux'

import {setLanguage} from 'redux-i18n'

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.languages = ['es', 'en', 'de-DE']
  }

  componentWillMount() {
    this.props.dispatch(setLanguage('en'))
  }

  onChangeLang = (e) => {
    this.props.dispatch(setLanguage(e.target.value))
  }

  render() {
    const user = {name: 'Cesc'}
    const name = <b>{user.name}</b>

    return (
      <div>
        <h1>Translations Dict</h1>
        Language: {this.props.lang}<br/>
        Change language:
        <select value={this.props.lang} onChange={this.onChangeLang}>
          {this.languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
        </select><br/>
        Translation: {this.context.t('Hello world!')}<br/>
        Translation 2: <span dangerouslySetInnerHTML={{ __html: this.context.t('Hello {name}', {name: name})}}/>
      </div>
    )
  }
}

Main.contextTypes = {
  t: PropTypes.func.isRequired
}

export default connect(state => ({
  lang: state.i18nState.lang
}))(Main)
