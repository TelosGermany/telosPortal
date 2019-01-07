/*
 *
 * OfflineClient reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({
  transaction: null,
});

function OfflineClientReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default OfflineClientReducer;
