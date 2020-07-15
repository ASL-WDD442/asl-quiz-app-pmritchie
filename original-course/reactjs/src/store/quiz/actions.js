import API from '../../API';
import {
  SET_USER_QUIZZES,
  SET_PUBLIC_QUIZZES,
  SET_QUIZ,
  DELETE_QUIZ,
  ADD_USER_QUIZ,
  ADD_PUBLIC_QUIZ,
  REMOVE_PUBLIC_QUIZ,
} from '../actionTypes';
import { shouldLoad } from '../_utils';
import { getQuizQuestions } from '../question/actions';

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
  dispatch(getQuizQuestions(id));
  if (existingQuiz) return;
  const quiz = await API.get(`/quizzes/${id}`);
  dispatch({ type: SET_QUIZ, quiz });
};

export const deleteQuiz = id => async (dispatch) => {
  await API.delete(`quizzes/${id}`);
  dispatch({ type: DELETE_QUIZ, id });
};

export const addQuiz = quiz => async (dispatch) => {
  if (quiz.id) {
    // api call to update Quiz
    const updatedQuiz = await API.put(`/quizzes/${quiz.id}`, quiz);

    dispatch({ type: ADD_USER_QUIZ, quiz: { ...quiz, ...updatedQuiz } });
    if (quiz.type === 'private') dispatch({ type: REMOVE_PUBLIC_QUIZ, id: updatedQuiz.id });
    else if (quiz.type === 'public') dispatch({ type: ADD_PUBLIC_QUIZ, id: updatedQuiz.id });
  } else {
    const createdQuiz = await API.post('/quizzes', quiz);
    // dispatch to update state
    dispatch({ type: SET_QUIZ, quiz: { ...quiz, ...createdQuiz } });
    dispatch({ type: ADD_USER_QUIZ, id: createdQuiz.id });
    if (quiz.type === 'public') dispatch({ type: ADD_PUBLIC_QUIZ, id: createdQuiz.id });
  }
  return quiz;
};
