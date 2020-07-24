const querystring = require('querystring');
// eslint-disable-next-line no-unused-vars
const log = require('debug')('web:request');

// eslint-disable-next-line no-unused-vars
exports.renderLogin = (req, res) => {
  res.render('login-form');
};

exports.redirectToSlack = (req, res) => {
  const SLACK_URL = 'https://slack.com/oauth/authorize?';

  const params = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    // get the basic info about the user and their email
    scope: 'identity.basic,identity.email',
  });
  res.redirect(SLACK_URL + params);
};

exports.verifySlackCode = async (req, res) => {
  // pull the code sent from slack out of the URL
  const { code } = req.query;
  // make an API request to verify the code
  const { token, loggedIn } = await req.API.post('/auth/slack', {
    code,
    url: process.env.CALLBACK_URL,
  });
  // save loggedin state and the token
  req.session.loggedIn = loggedIn;
  req.session.token = token;
  res.redirect('/admin/quizzes/list');
};

exports.logout = (req, res) => {
  // destroy the user's session data (token and loggedIn)
  req.session.destroy();
  // send them to the home page
  res.redirect('/');
};
exports.renderLogInFormWithErrors = (errors, req, res, next) => {
  const { username } = req.body;

  res.render('login-form', { username, errors });
};
exports.renderSignInFormWithErrors = (errors, req, res, next) => {
  const { username } = req.body;

  res.render('signUp-form', { username, errors });
};
exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  const { pass, loggedIn } = await req.API.post('/auth/signup', {
    username,
    password,
  });
  req.session.loggedIn = loggedIn;
  req.session.token = pass;
  res.redirect('/admin/quizzes/list');
};

exports.signUpForm = (req, res) => {
  res.render('signUp-form');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const { pass, loggedIn } = await req.API.post('/auth/login', {
    username,
    password,
  });
  req.session.loggedIn = loggedIn;
  req.session.token = pass;
  res.redirect('/admin/quizzes/list');
};
