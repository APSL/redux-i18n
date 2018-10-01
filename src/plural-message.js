/*
 * Project: redux-i18n
 * File: component/component.js
 */


import React from 'react';
import { PropTypes } from 'prop-types';

class PluralMessage extends React.Component {
  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  static translate = (context, props) => {
    const { texts, pluralCondition, values, description } = props;
    return context.t([
      ...texts,
      pluralCondition,
    ], values, description);
  };

  render() {
    return PluralMessage.translate(this.context, this.props);
  }
}

PluralMessage.propTypes = {
  texts: PropTypes.array.isRequired,
  values: PropTypes.object,
  pluralCondition: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

PluralMessage.defaultProps = {
  values: {},
};

export default PluralMessage
