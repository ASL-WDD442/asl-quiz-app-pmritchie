import API from '../../API';
import {
  SET_USER_QUIZZES, SET_PUBLIC_QUIZZES, SET_QUIZ, DELETE_QUIZ,
} from '../actionTypes';
import { shouldLoad } from '../_utils';

export const getUserQuizzes = () => async (dispatch, getState) => {
  const { quizzes: { userQuizzesLoadedAt } } = getState();
  if (!shouldLoad(userQuizzesLoadedAt)) return;
  const userQuizzes = await API.get('/quizzes');
  dispatch({ type: SET_USER_QUIZZES, userQuizzes });
};
export const getPublicQuizzes = () => async (dispatch, getState) => {
  const { quizzes: { publicQuizzesLoadedAt } } = getState();
  if (!shouldLoad(publicQuizzesLoadedAt)) return;
  const publicQuizzes = await API.get('/quizzes/public');
  dispatch({ type: SET_PUBLIC_QUIZZES, publicQuizzes });
};
export const getQuiz = id => async (dispatch, getState) => {
  // get the quiz out of state
  const { quizzes: { byId: { [id]: existingQuiz } } } = getState();
  if (existingQuiz) return;

  const quiz = await API.get(`/quizzes/${id}`);
  dispatch({ type: SET_QUIZ, quiz });
};
export const deleteQuiz = id => async (dispatch, getState) => {
  await API.delete(`quizzes/${id}`);
  dispatch({ type: DELETE_QUIZ, id });
};
