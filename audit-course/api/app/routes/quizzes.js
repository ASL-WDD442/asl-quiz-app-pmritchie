// import the express router
const router = require('express').Router();
// GET /quizzess route
const quizzesCtrl = require('../controllers/quizzes');
// import the protect middleware
const protectedRoute = require('../utils/protectedRoute');
// all rounters work here
router.get('/public', quizzesCtrl.getPublic);

router.get('/', protectedRoute, quizzesCtrl.getUserQuizzes);

router.get('/', quizzesCtrl.getAll);

router.post('/', protectedRoute, quizzesCtrl.createQuiz);

router.get('/:id', quizzesCtrl.getOneById);

router.put('/:id', protectedRoute, quizzesCtrl.updateQuiz);

router.delete('/:id', protectedRoute, quizzesCtrl.removeQuiz);

// export the route from this file
module.exports = router;
