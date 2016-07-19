var defaultCoord = [37.7837008, -122.4111551];

L.mapbox.accessToken = 'pk.eyJ1Ijoicm1jY2hlc24iLCJhIjoiY2lxbHkxbXFiMDA5dWZubm5mNWkwdGYwbiJ9.QC1lP-2tNymbJ5tHaMugZw';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

class Map extends React.Component {

  componentDidMount() {
    this.map = L.mapbox.map('map-one', 'mapbox.streets').setView(defaultCoord, 14);
  }

  render() {
    return (
      <div className='map' id='map-one' filters={this.props.filters} clickHandler={this.props.actions.clickLocationSubmit}></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.CollectionRestaurantsFilters.filterOptions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
