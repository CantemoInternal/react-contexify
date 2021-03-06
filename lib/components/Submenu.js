'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Submenu = function (_Component) {
  _inherits(Submenu, _Component);

  function Submenu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Submenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Submenu.__proto__ || Object.getPrototypeOf(Submenu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      style: {
        left: '100%',
        top: 0,
        bottom: 'initial'
      }
    }, _this.setRef = function (ref) {
      _this.menu = ref;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Submenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _window = window,
          innerWidth = _window.innerWidth,
          innerHeight = _window.innerHeight;

      var rect = this.menu.getBoundingClientRect();
      var style = {};

      if (rect.right < innerWidth) {
        style.left = '100%';
      } else {
        style.right = '100%';
      }

      if (rect.bottom > innerHeight) {
        style.bottom = 0;
        style.top = 'initial';
      } else {
        style.bottom = 'initial';
        style.top = 0;
      }

      this.setState({
        style: style
      });
    }
  }, {
    key: 'getMenuItem',
    value: function getMenuItem() {
      var _props = this.props,
          nativeEvent = _props.nativeEvent,
          refsFromProvider = _props.refsFromProvider,
          dataFromProvider = _props.dataFromProvider;


      return _react2.default.Children.map(this.props.children, function (item) {
        return _react2.default.cloneElement(item, {
          nativeEvent: nativeEvent,
          refsFromProvider: refsFromProvider,
          dataFromProvider: dataFromProvider
        });
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      e.stopPropagation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          arrow = _props2.arrow,
          disabled = _props2.disabled,
          className = _props2.className,
          style = _props2.style,
          label = _props2.label,
          nativeEvent = _props2.nativeEvent,
          refsFromProvider = _props2.refsFromProvider,
          dataFromProvider = _props2.dataFromProvider;

      var cssClasses = (0, _classnames2.default)(_styles2.default.item, className, _defineProperty({}, '' + _styles2.default.itemDisabled, typeof disabled === 'function' ? disabled({
        event: nativeEvent,
        dataFromProvider: dataFromProvider,
        ref: refsFromProvider
      }) : disabled));
      var submenuStyle = _extends({}, style, this.state.style);

      return _react2.default.createElement(
        'div',
        {
          className: cssClasses,
          role: 'presentation'
        },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.itemContent, onClick: this.handleClick },
          label,
          _react2.default.createElement(
            'span',
            { className: _styles2.default.submenuArrow },
            arrow
          )
        ),
        _react2.default.createElement(
          'div',
          {
            className: _styles2.default.submenu,
            ref: this.setRef,
            style: submenuStyle
          },
          this.getMenuItem()
        )
      );
    }
  }]);

  return Submenu;
}(_react.Component);

Submenu.propTypes = {
  label: _propTypes2.default.node.isRequired,
  children: _propTypes2.default.node.isRequired,
  arrow: _propTypes2.default.node,
  nativeEvent: _propTypes2.default.object,
  dataFromProvider: _propTypes2.default.any,
  refsFromProvider: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.object)]),
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  disabled: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func])
};
Submenu.defaultProps = {
  arrow: '▶',
  nativeEvent: null,
  dataFromProvider: null,
  refsFromProvider: null,
  className: null,
  style: {},
  disabled: false
};
exports.default = Submenu;