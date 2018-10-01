/*
 * Project: redux-i18n
 * File: component/component.js
 */


import React from 'react';
import { PropTypes } from 'prop-types';


class Message extends React.Component {
  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  static translate = (context, props) => {
    const { text, values, description } = props;
    return context.t(text, values, description);
  };

  render() {
    return Message.translate(this.context, this.props);
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  values: PropTypes.object,
  description: PropTypes.string.isRequired,
};

Message.defaultProps = {
  values: {},
};

export default Message
