'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactDeepForceUpdate = require('react-deep-force-update');

var _reactDeepForceUpdate2 = _interopRequireDefault(_reactDeepForceUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Project: redux-i18n
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * File: component.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var I18n = function (_React$Component) {
  _inherits(I18n, _React$Component);

  function I18n(props) {
    _classCallCheck(this, I18n);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(I18n).call(this, props));

    _this.trans = _this.trans.bind(_this);
    return _this;
  }

  // Check if the text need replace some params


  _createClass(I18n, [{
    key: 'params',
    value: function params(text, _params) {
      if (_params !== undefined) {
        for (var k in _params) {
          var reg = new RegExp('\{' + k + '\}', 'g');
          text = text.replace(reg, _params[k]);
        }
      }
      return text;
    }

    // Main method for translating texts

  }, {
    key: 'trans',
    value: function trans(textKey, params) {
      var langMessages = this.props.translations[this.props.lang];

      if (langMessages === undefined) {
        return this.params(textKey, params);
      }

      var message = langMessages[textKey];
      if (message === undefined || message === '') {
        return this.params(textKey, params);
      }

      return this.params(message, params);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        t: this.trans
      };
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.lang !== this.props.lang) {
        (0, _reactDeepForceUpdate2.default)(this);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return I18n;
}(_react2.default.Component);

I18n.childContextTypes = {
  t: _react2.default.PropTypes.func.isRequired
};

I18n.propTypes = {
  translations: _react2.default.PropTypes.object.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    lang: state.i18nState.lang
  };
})(I18n);