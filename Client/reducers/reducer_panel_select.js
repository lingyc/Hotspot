import {PANEL_OPEN_COLLECTION_ITEM } from '../actions/index';
import {PANEL_CLOSE_COLLECTION_ITEM } from '../actions/index';
import {PANEL_DELETE_COLLECTION_ITEM } from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
  case PANEL_OPEN_COLLECTION_ITEM:
    return {...state, item: action.payload};
  case PANEL_CLOSE_COLLECTION_ITEM:
    return {...state, item: null};
  case PANEL_DELETE_COLLECTION_ITEM:
    return {...state, item: action.payload};
    // not sure how you want to delete a restaurant
  }
  return state;
}
