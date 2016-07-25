import { CREATE_FILTERS } from '../actions/index';
import { PANEL_CLICK_FILTER_ITEM } from '../actions/index';

const initialState = {
  filters: [],
  filterSelected: [],
  filteredRestaurants: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_FILTERS:
      return {
        ...state,
        filters:action.payload
      }
    case PANEL_CLICK_FILTER_ITEM:
      return {
        ...state,
        filterSelected: action.payload.selectedFilters,
        filteredRestaurants: action.payload.filteredRestaurants
      };
    default:
      return state;
  }
}
