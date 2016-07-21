import { combineReducers } from 'redux';
import CollectionRestaurants from './reducer_collection_restaurants';
import FilteredRestaurants from './reducer_filtered_restaurants';
import FilterOptions from './reducer_filter_options';
import FilterSelected from './reducer_filtered';

const rootReducer = combineReducers({
  allRestaurants: CollectionRestaurants,
  filteredRestaurants: FilteredRestaurants,
  filterOptions: FilterOptions,
  FilterSelected: FilterSelected
});

export default rootReducer;
