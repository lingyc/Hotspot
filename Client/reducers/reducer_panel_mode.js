import { NAV_CLICK_FILTER } from '../actions/index';
import { NAV_CLICK_COLLECTION } from '../actions/index';
import { SHOW_RESULTS} from '../actions/index';
const initialState = {
  panelMode: 'none',
  isOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NAV_CLICK_FILTER:
      return {
        ...state,
        panelMode: action.payload.panelMode,
        isOpen: action.payload.isOpen
      };
    case NAV_CLICK_COLLECTION:
      return {
        ...state,
        panelMode: action.payload.panelMode,
        isOpen: action.payload.isOpen
      };
      case SHOW_RESULTS:
      return {
        ...state,
        panelMode: action.payload.panelMode,
        isOpen: action.payload.isOpen
      };
    default:
      return state;
  }
}
