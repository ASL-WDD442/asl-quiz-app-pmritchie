import {
  SET_USER_QUIZZES, SET_PUBLIC_QUIZZES, SET_QUIZ, DELETE_QUIZ,
} from '../actionTypes';
import { arrayToObject, removeIdFromObject, removeIdFromArray } from '../_utils';

const startState = {
  byId: {},
  userQuizzes: [],
  publicQuizzes: [],
  // default 0 because they have not been loaded yet
  userQuizzesLoadedAt: 0,
  publicQuizzesLoadedAt: 0,
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
        byId: {
          ...state.byId,
          ...arrayToObject(userQuizzes),
        },
        userQuizzes: userQuizzes.map(quiz => quiz.id),
        userQuizzesLoadedAt: Date.now(),
      };
    }
    case SET_PUBLIC_QUIZZES: {
      const { publicQuizzes } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          ...arrayToObject(publicQuizzes),
        },
        publicQuizzes: publicQuizzes.map(quiz => quiz.id),
        publicQuizzesLoadedAt: Date.now(),
      };
    }
    case SET_QUIZ: {
      const { quiz } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [quiz.id]: quiz,
        },
      };
    }
    case DELETE_QUIZ: {
      const { id } = payload;
      return {
        ...state,
        byId: removeIdFromObject(id, state.byId),
        userQuizzes: removeIdFromArray(id, state.userQuizzes),
        publicQuizzes: removeIdFromArray(id, state.publicQuizzes),
      };
    }
    default: return state;
  }
}
