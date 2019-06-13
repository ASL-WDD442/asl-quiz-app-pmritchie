const querystring = require('querystring');
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
  const { token, loggedIn } = await req.API.post('/auth/slack', { code, url: process.env.CALLBACK_URL });
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
