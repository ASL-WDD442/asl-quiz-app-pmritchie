import {
  SET_QUESTION_CHOICES, SET_CHOICE, ADD_QUESTION_CHOICE, REMOVE_CHOICE,
} from '../actionTypes';
import { arrayToObject, removeIdFromObject, removeIdFromArray } from '../_utils';

const startState = {
  questionLoadedAt: {},
  byQuestionId: {},
  byId: {},
};

export default function choiceReducer(state = startState, action) {
  const { type, ...payload } = action;
  switch (type) {
    case SET_QUESTION_CHOICES: {
      const { choices, questionId } = payload;
      return {
        ...state,
        questionLoadedAt: {
          ...state.questionLoadedAt,
          [questionId]: Date.now(),
        },
        byQuestionId: {
          ...state.byQuestionId,
          [questionId]: choices.map(choice => choice.id),
        },
        byId: {
          ...state.byId,
          ...arrayToObject(choices),
        },
      };
    }
    case SET_CHOICE: {
      const { choice } = payload;
      return {
        ...state,
        byId: {
          ...state.byId,
          [choice.id]: choice,
        },
      };
    }
    case ADD_QUESTION_CHOICE: {
      const { id, questionId } = payload;
      const allIds = [...(state.byQuestionId[questionId] || []), id];
      return {
        ...state,
        byId: {
          ...state.byQuestionId,
          [questionId]: [...new Set(allIds)],
        },
      };
    }
    case REMOVE_CHOICE: {
      const { id } = payload;
      const { questionId } = state.byId[id];
      return {
        ...state,
        byId: removeIdFromObject(id, state.byId),
        byQuestionId: {
          ...state.byQuestionId,
          [questionId]: removeIdFromArray(id, state.byQuestionId[questionId]),
        },
      };
    }
    default: return state;
  }
}
