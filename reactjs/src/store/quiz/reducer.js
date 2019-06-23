import { SET_USER_QUIZZES, SET_PUBLIC_QUIZZES } from '../actionTypes';

const startState = {
  userQuizzes: [],
  publicQuizzes: [],
};

export default function quizzesReducer(state = startState, action) {
  const { type, ...payload } = action;
  // check action type to see if it matches in from actionTypes.js
  switch (type) {
    case SET_USER_QUIZZES: {
      const { userQuizzes } = payload;
      // return an object of current state and payload
      return {
        ...state,
        userQuizzes,
      };
    }
    case SET_PUBLIC_QUIZZES: {
      const { publicQuizzes } = payload;
      return {
        ...state,
        publicQuizzes,
      };
    }
    default: return state;
  }
}
