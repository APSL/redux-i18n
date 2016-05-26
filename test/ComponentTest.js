import React from 'react';
import {connect} from "react-redux"
import {setLanguage} from "../src/actions"

class ComponentTest extends React.Component {

  onChangeLang() {
    this.props.dispatch(setLanguage("es"))
  }

  render() {
    return (
      <div>
        <span>{this.context.t("Hello")}</span>
        <button onClick={this.onChangeLang.bind(this)}/>
      </div>
    )
  }
}

ComponentTest.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default connect()(ComponentTest)

