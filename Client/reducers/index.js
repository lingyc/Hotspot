import { combineReducers } from 'redux';
import CollectionRestaurantsFilters from './reducer_collection_restaurants';
import FilterSelectedRestaurants from './reducer_filtered_restaurants';
import PanelMode from './reducer_panel_mode';
import SearchBar from './reducer_search_bar';

const rootReducer = combineReducers({
  CollectionRestaurantsFilters: CollectionRestaurantsFilters,
  PanelMode: PanelMode,
  FilterSelectedRestaurants: FilterSelectedRestaurants,
  SearchBar: SearchBar
});

export default rootReducer;
