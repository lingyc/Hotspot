import { FETCH_FRIENDREQS } from '../actions/index';

const initialState = {
  friendReqs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
  
    case FETCH_FRIENDREQS:
      return {
        ...state,
        friendReqs: action.payload.body.data
      };
    default:
      return state;
  }
}

