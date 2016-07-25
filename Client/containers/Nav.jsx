import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleCollectionList, toggleFilterList, logout } from '../actions/index';

class Nav extends React.Component {

  collectionClick(e) {
    e.preventDefault();
    this.props.actions.toggleCollectionList(this.props.PanelMode, this.props.isOpen);
  }

  filterClick(e) {
    e.preventDefault();
    this.props.actions.toggleFilterList(this.props.PanelMode, this.props.isOpen);
  }

  signOut(e) {
    e.preventDefault();
    this.props.actions.logout();
  }

  render() {
    return (
      <nav className="navbar">
          <div onClick={this.collectionClick.bind(this)} className='collectionPanel' >Collection</div>
          <div onClick={this.filterClick.bind(this)} className='filterPanel'>Filter</div>
          <a href="/logout">Sign Out</a>
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
    PanelMode: state.PanelMode.panelMode,
    isOpen: state.PanelMode.isOpen
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
