'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = connect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shallowEqual = require('./util/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function connect(mapStateToProps, mapDispatchToProps) {

    return function (WrappedComponent) {
        var _class, _temp;

        return _temp = _class = function (_Component) {
            _inherits(Hoc, _Component);

            function Hoc(props, context) {
                _classCallCheck(this, Hoc);

                var _this = _possibleConstructorReturn(this, (Hoc.__proto__ || Object.getPrototypeOf(Hoc)).call(this, props));

                _this.store = props.store || context.store;

                _this.unsubscribe = _this.store.subscribe(function () {
                    _this.setState({});
                });

                _this.memorizeProps = _this.calculateProps();
                return _this;
            }

            _createClass(Hoc, [{
                key: 'calculateProps',
                value: function calculateProps() {
                    var o1 = mapStateToProps(this.store.getState(), this.props);

                    var o2 = null;
                    if (mapDispatchToProps) {
                        o2 = mapDispatchToProps(this.store.dispatch, this.props);
                    } else {
                        o2 = {
                            dispatch: this.store.dispatch
                        };
                    }

                    return _extends({}, o1, o2);
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.unsubscribe();
                    this.unsubscribe = null;
                }
            }, {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate() {
                    var nextProps = this.calculateProps();

                    var isEqual = (0, _shallowEqual2.default)(nextProps, this.memorizeProps);
                    if (isEqual) {
                        return false;
                    } else {
                        this.memorizeProps = nextProps;
                        return true;
                    }
                }
            }, {
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.memorizeProps));
                }
            }]);

            return Hoc;
        }(_react.Component), _class.contextTypes = {
            store: _propTypes2.default.object
        }, _temp;
    };
}