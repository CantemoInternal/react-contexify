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

var _eventManager = require('../util/eventManager');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global: window */


var KEY = {
  ENTER: 13,
  ESC: 27
};

var ContextMenu = function (_Component) {
  _inherits(ContextMenu, _Component);

  function ContextMenu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ContextMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContextMenu.__proto__ || Object.getPrototypeOf(ContextMenu)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      x: 0,
      y: 0,
      visible: false,
      nativeEvent: null
    }, _this.menu = null, _this.refsFromProvider = null, _this.unsub = [], _this.hideTimeout = null, _this.bindWindowEvent = function () {
      window.addEventListener('resize', _this.hide);
      window.addEventListener('contextmenu', _this.hide);
      window.addEventListener('mousedown', _this.hide);
      window.addEventListener('click', _this.hide);
      window.addEventListener('scroll', _this.hide);
      window.addEventListener('keydown', _this.handleKeyboard);
    }, _this.unBindWindowEvent = function () {
      window.removeEventListener('resize', _this.hide);
      window.removeEventListener('contextmenu', _this.hide);
      window.removeEventListener('mousedown', _this.hide);
      window.removeEventListener('click', _this.hide);
      window.removeEventListener('scroll', _this.hide);
      window.removeEventListener('keydown', _this.handleKeyboard);
    }, _this.onMouseEnter = function () {
      return window.removeEventListener('mousedown', _this.hide);
    }, _this.onMouseLeave = function () {
      return window.addEventListener('mousedown', _this.hide);
    }, _this.hide = function (e) {
      if (typeof e !== 'undefined' && e.button === 2 && e.type !== 'contextmenu') {
        return;
      }
      // Safari trigger a click event when you ctrl + trackpad
      if (typeof e !== 'undefined' && e.ctrlKey === true && e.type !== 'contextmenu') {
        return;
      }
      _this.unBindWindowEvent();
      _this.setState({ visible: false });
    }, _this.handleKeyboard = function (e) {
      if (e.keyCode === KEY.ENTER || e.keyCode === KEY.ESC) {
        _this.unBindWindowEvent();
        _this.setState({ visible: false });
      }
    }, _this.setRef = function (ref) {
      _this.menu = ref;
    }, _this.show = function (e, refsFromProvider, data) {
      e.stopPropagation();
      _eventManager2.default.emit('hideAll');

      // store for later use
      _this.refsFromProvider = refsFromProvider;
      _this.dataFromProvider = data;

      var _this$getMousePositio = _this.getMousePosition(e),
          x = _this$getMousePositio.x,
          y = _this$getMousePositio.y;

      _this.setState({
        visible: true,
        x: x,
        y: y,
        nativeEvent: e
      }, _this.setMenuPosition);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ContextMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsub.push(_eventManager2.default.on('display::' + this.props.id, this.show));
      this.unsub.push(_eventManager2.default.on('hideAll', this.hide));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsub.forEach(function (cb) {
        return cb();
      });
      this.unBindWindowEvent();
    }
  }, {
    key: 'setMenuPosition',
    value: function setMenuPosition() {
      var _window = window,
          windowWidth = _window.innerWidth,
          windowHeight = _window.innerHeight;
      var _menu = this.menu,
          menuWidth = _menu.offsetWidth,
          menuHeight = _menu.offsetHeight;
      var _state = this.state,
          x = _state.x,
          y = _state.y;


      if (x + menuWidth > windowWidth) {
        x -= x + menuWidth - windowWidth;
      }

      if (y + menuHeight > windowHeight) {
        y -= y + menuHeight - windowHeight;
      }

      this.setState({
        x: x,
        y: y
      }, this.bindWindowEvent);
    }
  }, {
    key: 'getMousePosition',
    value: function getMousePosition(e) {
      var pos = {
        x: e.clientX,
        y: e.clientY
      };

      if (e.type === 'touchend' && (pos.x === null || pos.y === null) && e.changedTouches !== null && e.changedTouches.length > 0) {
        pos.x = e.changedTouches[0].clientX;
        pos.y = e.changedTouches[0].clientY;
      }

      if (pos.x === null || pos.x < 0) {
        pos.x = 0;
      }

      if (pos.y === null || pos.y < 0) {
        pos.y = 0;
      }

      return pos;
    }
  }, {
    key: 'getMenuItem',
    value: function getMenuItem() {
      var _this2 = this;

      var children = _react2.default.Children.toArray(this.props.children).filter(function (child) {
        return Boolean(child);
      });

      return _react2.default.Children.map(children, function (item) {
        return _react2.default.cloneElement(item, {
          nativeEvent: _this2.state.nativeEvent,
          refsFromProvider: _this2.refsFromProvider,
          dataFromProvider: _this2.dataFromProvider
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _cx;

      var _props = this.props,
          theme = _props.theme,
          animation = _props.animation,
          style = _props.style,
          className = _props.className;

      var cssClasses = (0, _classnames2.default)(_styles2.default.menu, className, (_cx = {}, _defineProperty(_cx, _styles2.default.theme + theme, theme !== null), _defineProperty(_cx, _styles2.default.animationWillEnter + animation, animation !== null), _cx));
      var menuStyle = _extends({}, style, {
        left: this.state.x,
        top: this.state.y + 1,
        opacity: 1
      });

      return this.state.visible && _react2.default.createElement(
        'div',
        {
          className: cssClasses,
          style: menuStyle,
          ref: this.setRef,
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave
        },
        _react2.default.createElement(
          'div',
          null,
          this.getMenuItem()
        )
      );
    }
  }]);

  return ContextMenu;
}(_react.Component);

ContextMenu.propTypes = {
  id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
  children: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  theme: _propTypes2.default.string,
  animation: _propTypes2.default.string
};
ContextMenu.defaultProps = {
  className: null,
  style: {},
  theme: null,
  animation: null
};
exports.default = ContextMenu;