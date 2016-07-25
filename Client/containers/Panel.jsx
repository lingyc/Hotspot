import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CollectionModel from '../components/CollectionModel';
import FilterItem from '../components/FilterItem';
import * as Actions from '../actions';

const Menu = require('react-burger-menu').slide;

class Panel extends React.Component {

  componentDidMount() {
    this.props.actions.fetchCollection();
  }

  render() {

    let panelItems;

    console.log('total collection', this.props.totalCollection);

    if (this.props.panelMode === 'filter') {
      let filterSelected = this.props.filterSelected;
      let toggleFilter = this.props.actions.toggleFilter;
      console.log(this.props.filters);
      panelItems = this.props.filters.map((filter) => {
        console.log(filter);
        return (<FilterItem filter={filter} appliedFilters={filterSelected} toggleFilter={toggleFilter}/>);
      });
      console.log('after', panelItems);
    } else if (this.props.filteredCollection.length !== 0) {
      console.log('is it getting in here?', this.props.filteredCollection.length);
      panelItems = this.props.filteredCollection.map((restaurant) => {
          return (<CollectionModel item={restaurant} key={restaurant.name}/>);
        });
    } else {
      console.log('in else', this.props.totalCollection);
      panelItems = this.props.totalCollection.map((restaurant) => {
          return (<CollectionModel item={restaurant} key={restaurant.name}/>);
        });
      console.log('panelItems', panelItems);
    }
    console.log('after if statement', panelItems);

    return (
      <Menu id={ 'panel' }
            right
            noOverlay
            customBurgerIcon={ false }
            customCrossIcon={ false }
            isOpen={ this.props.isOpen }>
        {panelItems}
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  console.log('mapStateToProps', state);
  return {
    totalCollection: state.CollectionRestaurantsFilters.collection,
    filters: state.CollectionRestaurantsFilters.filterOptions,
    filterSelected: state.FilterSelectedRestaurants.filterSelected,
    filteredCollection: state.FilterSelectedRestaurants.filteredRestaurants,
    panelMode: state.PanelMode.panelMode,
    isOpen: state.PanelMode.isOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
