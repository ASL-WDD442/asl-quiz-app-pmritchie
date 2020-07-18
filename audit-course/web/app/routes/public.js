const router = require('express').Router();

const quizCtrl = require('../controllers/quizzes');

router.get('/', quizCtrl.renderLanding);

router.get('/quiz/:quizId', quizCtrl.renderQuiz);

module.exports = router;
