import { combineReducers } from 'redux';
import CollectionRestaurantsFilters from './reducer_collection_restaurants';
import FilterSelectedRestaurants from './reducer_filtered_restaurants';
import PanelMode from './reducer_panel_mode';
import PanelSelect from './reducer_panel_select';

const rootReducer = combineReducers({
  CollectionRestaurantsFilters: CollectionRestaurantsFilters,
  PanelMode: PanelMode,
  FilterSelectedRestaurants: FilterSelectedRestaurants,
  PanelSelect: PanelSelect
});

export default rootReducer;


state = {
  PanelMode: 'filter', // or 'collectin'
    // if its collection then this.state.CollectionRestaurants.collection
    // if its filter then this.state.CollectionRestaurants.filterOptions and this.state.CollectionRestaurants.collection


  CollectionRestaurants: {
    collection: [],
    filterOptions: []
  },

  CollectionFilters: {
    filtersSelected: [],
    filteredRestaurants: []
  },

  PanelSelect: {}//single restaurant

};
