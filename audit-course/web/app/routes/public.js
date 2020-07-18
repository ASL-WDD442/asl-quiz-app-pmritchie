const router = require('express').Router();

const quizCtrl = require('../controllers/quizzes');

router.get('/', quizCtrl.renderLanding);

module.exports = router;
