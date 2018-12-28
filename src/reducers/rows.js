import * as ACTION from '../constants/';

const INITIAL_STATE = {
  error: null,
  loading: false,
  list: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION.SELECTED_ROW_CHANGED:
      return {
        ...state,
        list: action.rows,
      };
    default:
      return state;
  }
};
