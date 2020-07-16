// import the express router
const router = require('express').Router();
// import the Quiz controller
const quizCtrl = require('../controllers/quizzes');
// GET /quizzes route
router.get('/', quizCtrl.getAll);

router.get('/public', quizCtrl.getPublic);

router.get('/:id', quizCtrl.getOneById);

router.post('/', quizCtrl.createQuiz);

router.put('/:id', quizCtrl.updateQuiz);

router.delete('/:id', quizCtrl.removeQuiz);

// export the route from this file
module.exports = router;
