'use strict';

var Navigation = function Navigation(props) {
  return React.createElement(
    'nav',
    { className: 'navbar' },
    React.createElement(
      'div',
      { className: 'collectionPanel' },
      React.createElement(
        'button',
        { onClick: function onClick() {
            return props.panel('collection');
          } },
        ' '
      )
    ),
    React.createElement(
      'div',
      { className: 'filterPanel' },
      React.createElement('button', { onClick: function onClick() {
          return props.panel('filter');
        } })
    )
  );
};

window.Navigation = Navigation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0NsaWVudC9jb21wb25lbnQvTmF2LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQUksYUFBYSxTQUFiLFVBQWEsQ0FBQyxLQUFEO0FBQUEsU0FDYjtBQUFBO0FBQUEsTUFBSyxXQUFVLFFBQWY7QUFDRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGlCQUFmO0FBQ0U7QUFBQTtBQUFBLFVBQVEsU0FBUztBQUFBLG1CQUFNLE1BQU0sS0FBTixDQUFZLFlBQVosQ0FBTjtBQUFBLFdBQWpCO0FBQUE7QUFBQTtBQURGLEtBREY7QUFJRTtBQUFBO0FBQUEsUUFBSyxXQUFVLGFBQWY7QUFDRSxzQ0FBUSxTQUFTO0FBQUEsaUJBQU0sTUFBTSxLQUFOLENBQVksUUFBWixDQUFOO0FBQUEsU0FBakI7QUFERjtBQUpGLEdBRGE7QUFBQSxDQUFqQjs7QUFXQSxPQUFPLFVBQVAsR0FBb0IsVUFBcEIiLCJmaWxlIjoiTmF2LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIE5hdmlnYXRpb24gPSAocHJvcHMpID0+IChcbiAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdmJhclwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbGxlY3Rpb25QYW5lbCc+XG4gICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gcHJvcHMucGFuZWwoJ2NvbGxlY3Rpb24nKX0+IDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZmlsdGVyUGFuZWwnPlxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHByb3BzLnBhbmVsKCdmaWx0ZXInKX0+PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L25hdj5cbik7XG5cbndpbmRvdy5OYXZpZ2F0aW9uID0gTmF2aWdhdGlvbjtcbiJdfQ==