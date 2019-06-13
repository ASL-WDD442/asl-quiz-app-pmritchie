// import the express router
const router = require('express').Router();
// load the controller
const quizCtrl = require('../controllers/quizzes');
const authCtrl = require('../controllers/auth');
// GET / - loads the home page
router.get('/', quizCtrl.renderLanding);

router.get('/login', authCtrl.renderLogin);

router.get('/login/slack', authCtrl.redirectToSlack);

router.get('/slack/callback', authCtrl.verifySlackCode);
// GET /logout - log the user out of the application
router.get('/logout', authCtrl.logout);

router.get('/quiz/:quizId', quizCtrl.renderQuiz);
// export the route from this file
module.exports = router;
