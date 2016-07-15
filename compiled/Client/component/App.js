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
      panel: null,
      filter: null,
      collection: null
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // api function call here
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
          React.createElement(Map, { mainMap: this.state })
        )
      );
    }
  }]);

  return App;
}(React.Component);

window.App = App;

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0NsaWVudC9jb21wb25lbnQvQXBwLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQ00sRzs7O0FBQ0osZUFBWSxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsdUZBQ1gsS0FEVzs7QUFFakIsVUFBSyxLQUFMLEdBQWE7QUFDWCxhQUFPLElBREk7QUFFWCxjQUFRLElBRkc7QUFHWCxrQkFBWTtBQUhELEtBQWI7QUFGaUI7QUFPbEI7Ozs7d0NBRW1CO0FBQ2xCO0FBQ0Q7OztzQ0FFaUIsTSxFQUFRO0FBQ3hCO0FBQ0EsV0FBSyxRQUFMLENBQWM7QUFDWixlQUFPLEtBQUssS0FBTCxDQUFXLE1BQVg7QUFESyxPQUFkO0FBR0Q7Ozs2QkFJUTtBQUNQLGFBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxZQUFmO0FBQ0UsOEJBQUMsVUFBRCxJQUFZLE9BQU8sS0FBSyxpQkFBTCxDQUF1QixJQUF2QixDQUE0QixJQUE1QixDQUFuQjtBQURGLFNBREY7QUFJRTtBQUFBO0FBQUEsWUFBSyxXQUFVLE9BQWY7QUFDRSw4QkFBQyxLQUFELElBQU8sTUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUF4QjtBQURGLFNBSkY7QUFPRTtBQUFBO0FBQUEsWUFBSyxXQUFVLFNBQWY7QUFDRSw4QkFBQyxHQUFELElBQUssU0FBUyxLQUFLLEtBQW5CO0FBREY7QUFQRixPQURGO0FBYUQ7Ozs7RUFyQ2UsTUFBTSxTOztBQXlDeEIsT0FBTyxHQUFQLEdBQWEsR0FBYjs7QUFFQSxTQUFTLE1BQVQsQ0FBZ0Isb0JBQUMsR0FBRCxPQUFoQixFQUNBLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQURBIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHBhbmVsOiBudWxsLFxuICAgICAgZmlsdGVyOiBudWxsLFxuICAgICAgY29sbGVjdGlvbjogbnVsbFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBhcGkgZnVuY3Rpb24gY2FsbCBoZXJlXG4gIH1cblxuICBvbkNsaWNrc2xpZGVQYW5lbChzdHJpbmcpIHtcbiAgICAvLyBzbGlkZSBwYW5lbCBoZXJlXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwYW5lbDogdGhpcy5zdGF0ZVtzdHJpbmddXG4gICAgfSk7XG4gIH1cblxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIk5hdmlnYXRpb25cIj5cbiAgICAgICAgICA8TmF2aWdhdGlvbiBwYW5lbD17dGhpcy5vbkNsaWNrc2xpZGVQYW5lbC5iaW5kKHRoaXMpfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nUGFuZWwnPlxuICAgICAgICAgIDxQYW5lbCB2aWV3PXt0aGlzLnN0YXRlLnBhbmVsfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nTWFwQm9keSc+XG4gICAgICAgICAgPE1hcCBtYWluTWFwPXt0aGlzLnN0YXRlfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG59XG5cbndpbmRvdy5BcHAgPSBBcHA7XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwLz4sXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIl19