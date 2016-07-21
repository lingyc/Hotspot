import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCollection } from '../actions/index.js';
var Menu = require('react-burger-menu').push;
import Panel from './Panel';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPanel: false
    };
  }

  navClick(e) {
    e.preventDefault();
    <Menu isOpen />;
  }

  render() {
    return (
      <nav className="navbar">
        <div className='collectionPanel'>
          <Menu customBurgerIcon={ <button>Collection</button> } />
          <Menu customCrossIcon={ <button>Collection</button> } />
        </div>
        <div className='filterPanel'>
          <button onClick={() => props.panel('filter')}></button>
        </div>
      </nav>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchCollection}, dispatch);
}

export default connect(null, mapDispatchToProps)(Nav);
