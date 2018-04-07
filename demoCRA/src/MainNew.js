import React from "react"

import { connect } from "react-redux"

import { setLanguage, I18nContext } from "redux-i18n"

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.languages = ["es", "en", "de-DE"]
  }

  componentWillMount() {
    this.props.dispatch(setLanguage("en"))
  }

  dispatchLanguage = e => {
    this.props.dispatch(setLanguage(e.target.value))
  }

  render() {
    return (
      <div>
        <h1>Translations Dict</h1>
        Language: {this.props.lang}
        <br />
        Change language:
        <select value={this.props.lang} onChange={this.dispatchLanguage}>
          {this.languages.map(lang => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <br />
        <I18nContext.Consumer>
          {context => <span>{context.t('Hello world!')}</span>}
        </I18nContext.Consumer>
      </div>
    )
  }
}


export default connect(state => ({
  lang: state.i18nState.lang
}))(Main)
