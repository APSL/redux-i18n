import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import expect from 'expect'
import {describe, it} from 'mocha'
import localize from '../dist/hoc'

describe('hoc test', function() {
  class ProviderMock extends Component {

    static childContextTypes = {
      t: PropTypes.func.isRequired
    }

    getChildContext() {
      return {t: this.props.t}
    }

    render() {
      return Children.only(this.props.children)
    }
  }

  class Passthrough extends Component {
    render() {
      return <div />
    }
  }

  it('should receive the translation func in context', function() {
    function translation() {}

    const Container = localize()(Passthrough);

    const tree = TestUtils.renderIntoDocument(
      <ProviderMock t={translation}>
        <Container />
      </ProviderMock>
    )

    const container = TestUtils.findRenderedComponentWithType(tree, Container);
    expect(container.context.t).toEqual(translation)
  })

  it('should pass props to the given component', function() {
    function translation() {}

    const Container = localize()(Passthrough)

    const tree = TestUtils.renderIntoDocument(
      <ProviderMock t={translation}>
        <Container foo="bar" />
      </ProviderMock>
    )

    const stub = TestUtils.findRenderedComponentWithType(tree, Passthrough)
    expect(stub.props.foo).toEqual('bar')
    expect(stub.props.t).toEqual(translation)
  })

  it('should allow you to set the prop name in the child component by passing an arg to localize', function() {
    function translation() {}
    const Container = localize('translate')(Passthrough)

    const tree = TestUtils.renderIntoDocument(
      <ProviderMock t={translation}>
        <Container />
      </ProviderMock>
    )

    const stub = TestUtils.findRenderedComponentWithType(tree, Passthrough)
    expect(stub.props.t).toEqual(undefined)
    expect(stub.props.translate).toEqual(translation)
  })
})
