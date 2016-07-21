import { SAVE_RESTAURANT } from '../actions/index';
import { FETCH_RESTAURANTS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case SAVE_RESTAURANT:
    return state.concat([ action.payload ]);
  case FETCH_RESTAURANTS:
    return state;
  }
  return state;
}
