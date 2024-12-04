/*
 * @file: user.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @date: 28.11.2019
 * @author: Mohit
 */

/******** Reducers ********/

const initialState = {
  loggedIn: false,
  notifications: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      let payload={
        ...state,
        loggedIn: true,
        ...action.data
      }
      sessionStorage.setItem('token',payload.access_token)
      return payload;
    case 'LOG_OUT':
      sessionStorage.removeItem('token')
      return initialState;
    default:
      return state;
  }
}
