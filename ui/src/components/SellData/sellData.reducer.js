import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
} from './sellData.actions';

const initialState = {
  isOpen: false,
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        isOpen: true,
      };
    case CLOSE_DIALOG:
      return {
        isOpen: false
      };
    default:
      return state;
  }
};

export default reducer;