import {
  SET_LOGGED_IN,
} from '../actionTypes';

const startState = {
  loggedIn: !!localStorage.getItem('token'),
};

export default function authReducer(state = startState, action) {
  const { type, ...payload } = action;
  // see if the action type matches, then make changes to state
  switch (type) {
    case SET_LOGGED_IN: {
      const { loggedIn } = payload;
      // return a new object that has all the properties of the current state
      return {
        ...state,
        loggedIn,
      };
    }

    // no matches found, return the current unchanged state
    default: return state;
  }
}
