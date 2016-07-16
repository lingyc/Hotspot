'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

    _this.state = {
      map: 'map here', // can set the initial state map  here
      panel: null,
      filter: null,
      collection: null
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // api function call here if needed
    }
  }, {
    key: 'onClickslidePanel',
    value: function onClickslidePanel(string) {
      // slide panel here
      this.setState({
        panel: this.state[string]
      });
    }
  }, {
    key: 'loadMap',
    value: function loadMap(data) {
      // use this callback function if needed
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'Navigation' },
          React.createElement(Navigation, { panel: this.onClickslidePanel.bind(this) })
        ),
        React.createElement(
          'div',
          { className: 'Panel' },
          React.createElement(Panel, { view: this.state.panel })
        ),
        React.createElement(
          'div',
          { className: 'MapBody' },
          'insert map here',
          React.createElement(Map, { mainMap: this.state.map })
        )
      );
    }
  }]);

  return App;
}(React.Component);

window.App = App;

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0NsaWVudC9jb21wb25lbnQvQXBwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQ00sRzs7O0FBQ0osZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFFakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxXQUFLLFVBRE0sRUFDTTtBQUNqQixhQUFPLElBRkk7QUFHWCxjQUFRLElBSEc7QUFJWCxrQkFBWTtBQUpELEtBQWI7QUFGaUI7QUFRbEI7Ozs7d0NBRW1CO0FBQ2xCO0FBQ0Q7OztzQ0FFaUIsTSxFQUFRO0FBQ3hCO0FBQ0EsV0FBSyxRQUFMLENBQWM7QUFDWixlQUFPLEtBQUssS0FBTCxDQUFXLE1BQVg7QUFESyxPQUFkO0FBR0Q7Ozs0QkFFTyxJLEVBQU07QUFDWjtBQUNEOzs7NkJBR1E7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsWUFBZjtBQUNFLDhCQUFDLFVBQUQsSUFBWSxPQUFPLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBbkI7QUFERixTQURGO0FBSUU7QUFBQTtBQUFBLFlBQUssV0FBVSxPQUFmO0FBQ0UsOEJBQUMsS0FBRCxJQUFPLE1BQU0sS0FBSyxLQUFMLENBQVcsS0FBeEI7QUFERixTQUpGO0FBT0U7QUFBQTtBQUFBLFlBQUssV0FBVSxTQUFmO0FBQUE7QUFFRSw4QkFBQyxHQUFELElBQUssU0FBUyxLQUFLLEtBQUwsQ0FBVyxHQUF6QjtBQUZGO0FBUEYsT0FERjtBQWNEOzs7O0VBMUNlLE1BQU0sUzs7QUE4Q3hCLE9BQU8sR0FBUCxHQUFhLEdBQWI7O0FBRUEsU0FBUyxNQUFULENBQWdCLG9CQUFDLEdBQUQsT0FBaEIsRUFDQSxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FEQSIsImZpbGUiOiJBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBtYXA6ICdtYXAgaGVyZScsIC8vIGNhbiBzZXQgdGhlIGluaXRpYWwgc3RhdGUgbWFwICBoZXJlXG4gICAgICBwYW5lbDogbnVsbCxcbiAgICAgIGZpbHRlcjogbnVsbCxcbiAgICAgIGNvbGxlY3Rpb246IG51bGxcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gYXBpIGZ1bmN0aW9uIGNhbGwgaGVyZSBpZiBuZWVkZWRcbiAgfVxuXG4gIG9uQ2xpY2tzbGlkZVBhbmVsKHN0cmluZykge1xuICAgIC8vIHNsaWRlIHBhbmVsIGhlcmVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhbmVsOiB0aGlzLnN0YXRlW3N0cmluZ11cbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRNYXAoZGF0YSkge1xuICAgIC8vIHVzZSB0aGlzIGNhbGxiYWNrIGZ1bmN0aW9uIGlmIG5lZWRlZFxuICB9XG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTmF2aWdhdGlvblwiPlxuICAgICAgICAgIDxOYXZpZ2F0aW9uIHBhbmVsPXt0aGlzLm9uQ2xpY2tzbGlkZVBhbmVsLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdQYW5lbCc+XG4gICAgICAgICAgPFBhbmVsIHZpZXc9e3RoaXMuc3RhdGUucGFuZWx9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdNYXBCb2R5Jz5cbiAgICAgICAgICBpbnNlcnQgbWFwIGhlcmVcbiAgICAgICAgICA8TWFwIG1haW5NYXA9e3RoaXMuc3RhdGUubWFwfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxufVxuXG53aW5kb3cuQXBwID0gQXBwO1xuXG5SZWFjdERPTS5yZW5kZXIoPEFwcC8+LFxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcbiJdfQ==