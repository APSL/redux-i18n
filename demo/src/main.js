import React from 'react'

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
    return (
      <div>
        Language: {this.props.lang}<br/>
        Translation: {this.context.t('Hello world!')}<br/>
        Change language:
        <select value={this.props.lang} onChange={this.onChangeLang}>
          {this.languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
        </select>
      </div>
    )
  }
}

Main.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default connect(state => ({
  lang: state.i18nState.lang
}))(Main)
