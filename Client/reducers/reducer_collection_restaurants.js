import { MAP_CONFIRM_POINT } from '../actions/index';
import { FETCH_RESTAURANTS } from '../actions/index';
import { POPULATE_FILTER_OPTIONS } from '../actions/index';

const initialState = {
  filterOptions: [],
  collection: []
};

export default function(state = initialState, action) {
  switch (action.type) {
  case MAP_CONFIRM_POINT:
    return {
      ...state,
      filterOptions: state.filterOptions.concat([action.payload.filters])
    };
  case FETCH_RESTAURANTS:
    return {
      ...state,
      collection: action.payload
    default:
      return state;
  }
}
