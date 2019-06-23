import API from '../../API';
import { SET_USER_QUIZZES, SET_PUBLIC_QUIZZES } from '../actionTypes';

export const getUserQuizzes = () => async (dispatch) => {
  const userQuizzes = await API.get('/quizzes');
  dispatch({ type: SET_USER_QUIZZES, userQuizzes });
};
export const getPublicQuizzes = () => async (dispatch) => {
  const publicQuizzes = await API.get('/quizzes/public');
  dispatch({ type: SET_PUBLIC_QUIZZES, publicQuizzes });
};
