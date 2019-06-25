import API from '../../API';
import {
  SET_QUESTION_CHOICES, SET_CHOICE, ADD_QUESTION_CHOICE, REMOVE_CHOICE,
} from '../actionTypes';
import { shouldLoad } from '../_utils';

export const getQuestionChoices = questionId => async (dispatch, getState) => {
  const { choices: { questionLoadedAt: { [questionId]: loadedAt = 0 } } } = getState();
  if (!shouldLoad(loadedAt)) return;
  const choices = await API.get(`/choices?questionId=${questionId}`);
  dispatch({ type: SET_QUESTION_CHOICES, choices, questionId });
};
export const getChoice = id => async (dispatch, getState) => {
  // pulling choices from state
  const { choices: { byId: { [id]: existingChoice } } } = getState();
  if (existingChoice) return;
  const choice = await API.get(`/choices/${id}`);
  dispatch({ type: SET_CHOICE, choice });
};
export const addChoice = choice => async (dispatch) => {
  // check to see if it is an edit or new
  if (choice.id) {
    const updateChoice = await API.put(`/choices/${choice.id}`, choice);
    // update state here
    dispatch({ type: SET_CHOICE, choice: { ...choice, ...updateChoice } });
  } else {
    const newChoice = await API.post('/choices', choice);
    // dispatch to add to array
    console.log(`3${{ ...newChoice }}`);
    dispatch({ type: SET_CHOICE, choice: { ...choice, ...newChoice } });
    dispatch({ type: ADD_QUESTION_CHOICE, id: newChoice.id, questionId: newChoice.questionId });
  }
};
export const deleteChoice = id => async (dispatch) => {
  await API.delete(`/choices/${id}`);
  dispatch({ type: REMOVE_CHOICE, id });
};
