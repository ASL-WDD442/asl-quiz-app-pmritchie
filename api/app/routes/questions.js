// import the express router
const router = require('express').Router();
// GET /Questions route
const questionsCtrl = require('../controllers/questions');
const protectedRoute = require('../utils/protectedRoute');

router.get('/', questionsCtrl.getQuizQuestions);
// post works
router.post('/', protectedRoute, questionsCtrl.createQuestion);
// get by id works
router.get('/:id', questionsCtrl.getOneById);
// put works
router.put('/:id', protectedRoute, questionsCtrl.updateQuestion);
// delete works
router.delete('/:id', protectedRoute, questionsCtrl.removeQuestion);

// export the route from this file
module.exports = router;
