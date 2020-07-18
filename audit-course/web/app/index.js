// pull in the express package
const express = require('express');
// add another logger
const error = require('debug')('web:error');
// load in the axios middleware
const API = require('./utils/API');
// create an express app
const publicRoutes = require('./routes/public');
const adminQuizRoutes = require('./routes/adminQuizzes');
const questionsRouter = require('./routes/adminQuestions');
const choicesRouter = require('./routes/adminChoices');

const app = express();
// setup a folder to hold all the static files
app.use(express.static('public'));
// checks to see if content type is url-encoded and parses it
app.use(express.urlencoded({ extended: true }));
// axios middleware
app.use(API);
// setting put as the view engine
app.set('view engine', 'pug');
// set the view folder as the default place to render from
app.set('views', `${__dirname}/views`);
app.use('/', publicRoutes);
app.use('/admin/quizzes', adminQuizRoutes);
app.use('/admin/questions', questionsRouter);
app.use('/admin/choices', choicesRouter);
// four params are required to mark this as a error handling middleware
// the comment beloww this allows for eslint to not throw an error because
// I am not using the next funciton
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;
