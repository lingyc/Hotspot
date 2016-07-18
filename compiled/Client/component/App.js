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
          { className: 'MapBody', id: 'map' },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0NsaWVudC9jb21wb25lbnQvQXBwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQ00sRzs7O0FBQ0osZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFFakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxXQUFLLFVBRE0sRUFDTTtBQUNqQixhQUFPLElBRkk7QUFHWCxjQUFRLElBSEc7QUFJWCxrQkFBWTtBQUpELEtBQWI7QUFGaUI7QUFRbEI7Ozs7d0NBRW1CO0FBQ2xCO0FBQ0Q7OztzQ0FFaUIsTSxFQUFRO0FBQ3hCO0FBQ0EsV0FBSyxRQUFMLENBQWM7QUFDWixlQUFPLEtBQUssS0FBTCxDQUFXLE1BQVg7QUFESyxPQUFkO0FBR0Q7Ozs0QkFFTyxJLEVBQU07QUFDWjtBQUNEOzs7NkJBR1E7QUFDUCxhQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsWUFBZjtBQUNFLDhCQUFDLFVBQUQsSUFBWSxPQUFPLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBbkI7QUFERixTQURGO0FBSUU7QUFBQTtBQUFBLFlBQUssV0FBVSxPQUFmO0FBQ0UsOEJBQUMsS0FBRCxJQUFPLE1BQU0sS0FBSyxLQUFMLENBQVcsS0FBeEI7QUFERixTQUpGO0FBT0U7QUFBQTtBQUFBLFlBQUssV0FBVSxTQUFmLEVBQXlCLElBQUcsS0FBNUI7QUFBQTtBQUVFLDhCQUFDLEdBQUQsSUFBSyxTQUFTLEtBQUssS0FBTCxDQUFXLEdBQXpCO0FBRkY7QUFQRixPQURGO0FBY0Q7Ozs7RUExQ2UsTUFBTSxTOztBQThDeEIsT0FBTyxHQUFQLEdBQWEsR0FBYjs7QUFFQSxTQUFTLE1BQVQsQ0FBZ0Isb0JBQUMsR0FBRCxPQUFoQixFQUNBLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQURBIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1hcDogJ21hcCBoZXJlJywgLy8gY2FuIHNldCB0aGUgaW5pdGlhbCBzdGF0ZSBtYXAgIGhlcmVcbiAgICAgIHBhbmVsOiBudWxsLFxuICAgICAgZmlsdGVyOiBudWxsLFxuICAgICAgY29sbGVjdGlvbjogbnVsbFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBhcGkgZnVuY3Rpb24gY2FsbCBoZXJlIGlmIG5lZWRlZFxuICB9XG5cbiAgb25DbGlja3NsaWRlUGFuZWwoc3RyaW5nKSB7XG4gICAgLy8gc2xpZGUgcGFuZWwgaGVyZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFuZWw6IHRoaXMuc3RhdGVbc3RyaW5nXVxuICAgIH0pO1xuICB9XG5cbiAgbG9hZE1hcChkYXRhKSB7XG4gICAgLy8gdXNlIHRoaXMgY2FsbGJhY2sgZnVuY3Rpb24gaWYgbmVlZGVkXG4gIH1cblxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJOYXZpZ2F0aW9uXCI+XG4gICAgICAgICAgPE5hdmlnYXRpb24gcGFuZWw9e3RoaXMub25DbGlja3NsaWRlUGFuZWwuYmluZCh0aGlzKX0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J1BhbmVsJz5cbiAgICAgICAgICA8UGFuZWwgdmlldz17dGhpcy5zdGF0ZS5wYW5lbH0vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J01hcEJvZHknIGlkPSdtYXAnPlxuICAgICAgICAgIGluc2VydCBtYXAgaGVyZVxuICAgICAgICAgIDxNYXAgbWFpbk1hcD17dGhpcy5zdGF0ZS5tYXB9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG59XG5cbndpbmRvdy5BcHAgPSBBcHA7XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwLz4sXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIl19