import { MAP_CONFIRM_POINT } from '../actions/index';
 import { FETCH_COLLECTION } from '../actions/index';
 
 
 const initialState = {
   results: []
 };
 
 export default function(state = initialState, action) {
   switch (action.type) {
     
     case SHOW_RESULTS:
       return {
         ...state,
         results: action.payload.body.data
       };
     default:
       return state;
   }
 }