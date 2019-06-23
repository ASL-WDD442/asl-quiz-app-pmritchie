import API from '../../API';
import { SET_USER_QUIZZES, SET_PUBLIC_QUIZZES } from '../actionTypes';
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
