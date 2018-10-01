import {Component, createElement}  from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import invariant from 'invariant';
import Message from '../message';
import PluralMessage from '../plural-message';

const invalidPropNames = ['translateMessage', 'translatePluralMessage'];

function validatePropName(propName) {
  if (invalidPropNames.includes(propName)) {
    throw Error(`Invalid propName was passed: "${propName}`);
  }
}

export default function localize(propName = 't') {
  validatePropName(propName);
  return function wrapWithLocalized(WrappedComponent) {
    invariant(
      typeof WrappedComponent === 'function',
      `You must pass a component to the function returned by localize.
      Instead received ${JSON.stringify(WrappedComponent)}`
    );

    class Localized extends Component {
      static contextTypes = {
        t: PropTypes.func.isRequired
      };

      constructor(props, context) {
        super(props, context);
        this.t = context.t;
      }

      translateMessage = message => Message.translate(this.context, message);

      translatePluralMessage = message => PluralMessage.translate(this.context, message);

      render() {
        return createElement(WrappedComponent, {...this.props, [propName]: this.t, translateMessage: this.translateMessage, translatePluralMessage: this.translatePluralMessage});
      }
    }

    return hoistStatics(Localized, WrappedComponent)
  }
}
