import { combineReducers } from 'redux';
import CollectionRestaurantsFilters from './reducer_collection_restaurants';
import FilterSelectedRestaurants from './reducer_filtered_restaurants';
import PanelMode from './reducer_panel_mode';

const rootReducer = combineReducers({
  CollectionRestaurantsFilters: CollectionRestaurantsFilters,
  PanelMode: PanelMode,
  FilterSelectedRestaurants: FilterSelectedRestaurants,
});

export default rootReducer;
