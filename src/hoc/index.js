import {Component, createElement}  from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import invariant from 'invariant';
import { isValidElementType } from 'react-is'


export default function localize(propName = 't') {
  return function wrapWithLocalized(WrappedComponent) {
    invariant(
      isValidElementType(WrappedComponent),
      `You must pass a component to the function returned by localize.
      Instead received ${JSON.stringify(WrappedComponent)}`
    )

    class Localized extends Component {
      static contextTypes = {
        t: PropTypes.func.isRequired
      }

      constructor(props, context) {
        super(props, context)
        this.t = context.t
      }

      render() {
        return createElement(WrappedComponent, {...this.props, [propName]: this.t})
      }

    }

    return hoistStatics(Localized, WrappedComponent)
  }
}
