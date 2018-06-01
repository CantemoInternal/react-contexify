'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconFont = function IconFont(_ref) {
  var className = _ref.className,
      style = _ref.style,
      children = _ref.children;
  return _react2.default.createElement(
    'i',
    { className: (0, _classnames2.default)(_styles2.default.itemIcon, className), style: style },
    children
  );
};

IconFont.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  children: _propTypes2.default.node
};

IconFont.defaultProps = {
  className: '',
  style: {},
  children: ''
};

exports.default = IconFont;