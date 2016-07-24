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

    // Default collection to the total collection
    let collection = this.props.totalCollection;

    // If filteredCollection is populated, use that instead
    if (this.props.filteredCollection !== []) {
      collection = this.props.filteredCollection;
    }

    // Set up variable to be populated with panel items
    // Default it with the collection of restaurants
    let panelItems = collection.map((restaurant) => {
        return (<CollectionModel restaurant={restaurant} />);
      });

    // Populate said variable with all filter items if the
    // filter panel is stated to show
    if (this.props.panelMode === 'filter') {
      let filterSelected = this.props.filterSelected;
      let toggleFilter = this.props.actions.toggleFilter;
      panelItems = this.props.filters.map((filter) => {
        return (<FilterItem filter={filter} appliedFilters={filterSelected} toggleFilter={toggleFilter}/>);
      });
    };

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
