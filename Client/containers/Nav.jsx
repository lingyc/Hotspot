import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleCollectionList, toggleFilterList, logout } from '../actions/index';

class Nav extends React.Component {

  collectionClick(e) {
    e.preventDefault();
    console.log(this.props.PanelMode);
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
          <li onClick={this.signOut.bind(this)}>Sign Out</li>
        </ul>
      </nav>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({toggleCollectionList, toggleFilterList, logout}, dispatch)
  };
}

function mapStateToProps(state) {
  return  {
<<<<<<< 4d3da4c4ea74d9e5fc27193cb416fd2a86359f7b
    PanelMode: state.PanelMode.panelMode
=======
    PanelMode: state.panelMode
>>>>>>> Making attempts to get program to compile without throwing errors when run
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
