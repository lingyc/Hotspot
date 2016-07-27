import { NAV_SEARCH } from '../actions/index';
import { NAV_SEARCH_RESULTS } from '../actions/index';

const initialState = {
  searchInput: '',
  searchResults: []
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
    default:
      return state;
  }
}
