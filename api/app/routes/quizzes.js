// import the express router
const router = require('express').Router();
// GET /quizzess route
const quizzesCtrl = require('../controllers/quizzes');
// all rounters work here
router.get('/public', quizzesCtrl.getPublic);

router.get('/', quizzesCtrl.getAllUsersQuizzes);

router.post('/', quizzesCtrl.createQuiz);

router.get('/:id', quizzesCtrl.getOneById);

router.put('/:id', quizzesCtrl.updateQuiz);

router.delete('/:id', quizzesCtrl.removeQuiz);

// export the route from this file
module.exports = router;
