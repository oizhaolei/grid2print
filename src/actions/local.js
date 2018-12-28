import * as ACTION from '../constants/';

export const selectedRows = rows => ({
  type: ACTION.SELECTED_ROW_CHANGED,
  rows,
});
