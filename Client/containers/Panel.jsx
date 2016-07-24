import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CollectionModel from '../components/CollectionModel';
import FilterItem from '../components/FilterItem';
import * as Actions from '../actions';

const Menu = require('react-burger-menu').slide;

class Panel extends React.Component {

  render() {

    let panelItems;

    if (this.props.PanelMode === 'collction') {
      panelItems = this.props.collection.map((restaurant) => {
        return (<CollectionModel restaurant={restaurant} />);
      });
    } else if (this.props.PanelMode === 'filter') {
      let filterSelected = this.props.filterSelected;
      let toggleFilter = this.props.actions.toggleFilter;
      panelItems = this.props.filters.map((filter) => {
        return (<FilterItem filter={filter} appliedFilters={filterSelected} toggleFilter={toggleFilter}/>);
      });
    };

    let renderPanel = (
      <Menu id={ 'panel' }
            right
            noOverlay
            customBurgerIcon={ false }
            customCrossIcon={ false }
            isOpen={ false }>
      </Menu>
    );

    if (this.props.PanelMode !== 'none') {
      renderPanel = (
        <Menu id={ 'panel' }
              right
              noOverlay
              customBurgerIcon={ false }
              customCrossIcon={ false }
              isOpen={ true }>
          {panelItems}
        </Menu>
      );
    }

    return (
      <div>
        {renderPanel}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    collection: state.CollectionRestaurantsFilters.collection,
    filters: state.CollectionRestaurantsFilters.filterOptions,
    filterSelected: state.FilterSelectedRestaurants.filterSelected,
    filteredRestaurants: state.FilterSelectedRestaurants.filteredRestaurants,
    PanelMode: state.PanelMode.panelMode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
