import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleCollectionList, toggleFilterList, logout } from '../actions/index';

class Nav extends React.Component {

  collectionClick(e) {
    e.preventDefault();
    this.props.actions.toggleCollectionList(this.props.PanelMode);
  }

  filterClick(e) {
    e.preventDefault();
    this.props.actions.toggleFilterList(this.props.PanelMode);
  }

  signOut(e) {
    e.preventDefault();
    this.props.actions.logout();
  }

  render() {
    return (
      <nav className="navbar">
        <ul>
          <li onClick={this.collectionClick.bind(this)} className='collectionPanel' >Collection</li>
          <li onClick={this.filterClick.bind(this)} className='filterPanel'>Filter</li>
          <li><a href="/logout">Sign Out</a></li>
        </ul>
      </nav>
    );
  }
}
// onClick={this.signOut.bind(this)}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({toggleCollectionList, toggleFilterList, logout}, dispatch)
  };
}

function mapStateToProps(state) {
  return  {
    PanelMode: state.PanelMode.panelMode
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
