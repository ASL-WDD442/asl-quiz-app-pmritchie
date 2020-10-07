import API from '../../API';
import {
  SET_QUIZ_QUESTIONS, SET_QUESTION, ADD_QUIZ_QUESTION, REMOVE_QUESTION,
} from '../actionTypes';
import { shouldLoad } from '../_utils';
import { getQuestionChoices } from '../choice/actions';

// eslint-disable-next-line import/prefer-default-export
export const getQuizQuestions = quizId => async (dispatch, getState) => {
  const { questions: { quizLoadedAt: { [quizId]: loadedAt = 0 } } } = getState();
  if (!shouldLoad(loadedAt)) return;
  const questions = await API.get(`/questions?quizId=${quizId}`);
  dispatch({ type: SET_QUIZ_QUESTIONS, questions, quizId });
};

export const getQuestion = id => async (dispatch, getState) => {
  // pull question from state
  const { questions: { byId: { [id]: existingQuestion } } } = getState();
  dispatch(getQuestionChoices(id));
  if (existingQuestion) return;
  const question = await API.get(`/questions/${id}`);
  // dispatch to update state
  dispatch({ type: SET_QUESTION, question });
};

export const saveQuestion = question => async (dispatch, getState) => {
  // check to see if it is an edit or new question
  if (question.id) {
    const updateQuestion = await API.put(`/questions/${question.id}`, question);
    // update STATTTTEEE
    dispatch({ type: SET_QUESTION, question: { ...question, ...updateQuestion } });
  } else {
    const newQuestion = await API.post('/questions', question);
    // dispatch to update state
    dispatch({ type: SET_QUESTION, question: { ...question, ...newQuestion } });
    dispatch({ type: ADD_QUIZ_QUESTION, id: newQuestion.id, quizId: question.quizId });
  }
};

export const deleteQuestion = id => async (dispatch) => {
  await API.delete(`/questions/${id}`);
  dispatch({ type: REMOVE_QUESTION, id });
};
