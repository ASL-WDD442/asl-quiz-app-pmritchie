import {
  SET_QUIZ_QUESTIONS, SET_QUESTION, ADD_QUIZ_QUESTION, REMOVE_QUESTION,
} from '../actionTypes';
import { arrayToObject, removeIdFromObject, removeIdFromArray } from '../_utils';

const startState = {
  quizLoadedAt: {},
  byQuizId: {},
  byId: {},
  userQuestions: [],
  userQuestionsLoadedAt: 0,
};

export default function questionReducer(state = startState, action) {
  const { type, ...payload } = action;
  switch (type) {
    case SET_QUIZ_QUESTIONS: {
      const { questions, quizId } = payload;
      return {
        ...state,
        quizLoadedAt: {
          ...state.quizLoadedAt,
          [quizId]: Date.now(),
        },
        byQuizId: {
          ...state.byQuizId,
          [quizId]: questions.map(question => question.id),
        },
        byId: {
          ...state.byId,
          ...arrayToObject(questions),
        },
        userQuestions: questions.map(question => question.id),
        userQuestionsLoadedAt: Date.now(),
      };
    }
    case SET_QUESTION: {
      const { question } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [question.id]: question,
        },
      };
    }
    case ADD_QUIZ_QUESTION: {
      const { id, quizId } = payload;
      // add id to arry of the options
      const allIds = [...state.byQuizId[quizId], id];
      return {
        ...state,
        byQuizId: {
          ...state.byQuizId,
          [quizId]: [...new Set(allIds)],
        },
      };
    }
    case REMOVE_QUESTION: {
      const { id } = payload;
      // pull the question out by id
      const { quizId } = state.byId[id];
      return {
        ...state,
        byId: removeIdFromObject(id, state.byId),
        byQuizId: {
          ...state.byQuizId,
          [quizId]: removeIdFromArray(id, state.byQuizId[quizId]),
        },
      };
    }
    default: return state;
  }
}
