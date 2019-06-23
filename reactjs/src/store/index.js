// get all the functions we need from redux
import { combineReducers, createStore, applyMiddleware } from 'redux';
// middleware for making actions asynchronous
import thunkMiddleware from 'redux-thunk';
// will log to console all the actions that are run
import { createLogger } from 'redux-logger';
// pull our reducers
import auth from './auth/reducer';
import quizzes from './quiz/reducer';
// combine multiple reducers into one
const rootReducer = combineReducers({
  auth,
  quizzes,
});

// set up middleware
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger(),
);

// create a redux store using the combined reducer and middleware functions
export const store = createStore(rootReducer, middleware);