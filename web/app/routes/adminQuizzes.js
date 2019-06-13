// import the express router
const router = require('express').Router();
// load the controller
const quizzesCrtl = require('../controllers/quizzes');
const validationCtrl = require('../controllers/validation');

router.get('/new', quizzesCrtl.newQuiz);

// POST /admin/Quiz/new - validate the data and than save it
router.post('/new', [
  validationCtrl.validate('createQuiz'),
  quizzesCrtl.renderDecisionFormWithErrors,
  quizzesCrtl.saveQuiz,
]);

router.post('/edit/:id',
  validationCtrl.validate('editQuiz'),
  quizzesCrtl.renderDecisionFormWithErrors,
  quizzesCrtl.saveQuiz);

router.get('/edit/:id', quizzesCrtl.renderEditForm);

// get users created quizzes
router.get('/list', quizzesCrtl.renderList);

router.get('/:id', quizzesCrtl.quizDetail);
// export the route from this file
module.exports = router;
