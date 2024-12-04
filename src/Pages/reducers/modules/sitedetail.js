/*
 * @file: user.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @date: 28.11.2019
 * @author: Mohit
 */

/******** Reducers ********/

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SITE_DETAIL_SUCCESS':
      return { ...state, ...action.data};
    default:
      return state;
  }
}
