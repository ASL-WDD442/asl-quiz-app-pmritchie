// pull in the express package
const error = require('debug')('api:error');
const express = require('express');
const morganDebug = require('morgan-debug');
// routes
const choiceRouter = require('./routes/choices');
const questionRouter = require('./routes/questions');
// create an express app
const app = express();
// checks to see if content-type is json and parses it into req.body
app.use(express.json());
// log all requests
app.use(morganDebug('api:request', 'dev'));
// setup the app to use the router at /choices
app.use('/choices', choiceRouter);
app.use('/questions', questionRouter);
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
