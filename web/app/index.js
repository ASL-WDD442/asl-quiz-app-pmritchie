// pull in the express package
const express = require('express');
// adding another logger
const error = require('debug')('web:error');
// load in the axios middleware
const API = require('./utils/API');
// load routers
const publicRoutes = require('./routes/public');
const adminQuizRoutes = require('./routes/adminQuizzes');
const adminQuestionsRoutes = require('./routes/adminQuestions');
const adminChoicesRoutes = require('./routes/adminChoices');
// create an express app
const app = express();
// setting up folder to hold static files
app.use(express.static('public'));
// checks to see if the content-type is url-encoded and parses it into req.body
app.use(express.urlencoded({ extended: true }));

app.use(API);
// setting pug as the view engine
app.set('view engine', 'pug');
// set the view folder as the default place to render from
app.set('views', `${__dirname}/views`);
// setup routers
app.use('/', publicRoutes);
app.use('/admin/quizzes', adminQuizRoutes);
app.use('/admin/questions', adminQuestionsRoutes);
app.use('/admin/choices', adminChoicesRoutes);
// axios middleware


app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;
