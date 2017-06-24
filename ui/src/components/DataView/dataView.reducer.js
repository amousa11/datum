import {
  OPEN_DATA_VIEW_DIALOG,
  CLOSE_DATA_VIEW_DIALOG,
} from './dataView.actions';

const initialState = {
  isOpen: false,
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case OPEN_DATA_VIEW_DIALOG:
      return {
        isOpen: true,
      };
    case CLOSE_DATA_VIEW_DIALOG:
      return {
        isOpen: false
      };
    default:
      return state;
  }
};

export default reducer;