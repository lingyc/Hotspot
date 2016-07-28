import { NAV_SEARCH } from '../actions/index';
import { NAV_SEARCH_RESULTS } from '../actions/index';
import { MAP_SEARCH_COORD } from '../actions/index';

const initialState = {
  searchInput: '',
  searchResults: [],
  coord: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NAV_SEARCH:
      return {
        ...state,
        searchInput: action.payload.searchInput
      };
    case NAV_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload.body.data
      };
    case MAP_SEARCH_COORD:
      return {
        ...state,
        coord: action.payload
      };
    default:
      return state;
  }
}
