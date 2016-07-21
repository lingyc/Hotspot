import React from 'react';
import { connect } from 'react-redux';
import CollectionModel from '../component/CollectionModel';
var Menu = require('react-burger-menu').push;

class Panel extends React.Component {

  showSettings(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div id='outer-container'>
        <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } right />
        <main id="page-wrap">
          <div className='panelBody panel'>
            <div className='data'>
              <CollectionModel restaurant={this.props.allRestaurants.map(restaurant => restaurant)}/>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {allRestaurants: state.allRestaurants};
}
export default connect(mapStateToProps)(Panel);
