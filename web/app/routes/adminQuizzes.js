// import the express router
const router = require('express').Router();
// load the controller
const quizzesCrtl = require('../controllers/quizzes');
const validationCtrl = require('../controllers/validation');

router.get('/new', quizzesCrtl.something);
// POST /admin/decisions/new - validate the data and than save it
router.post('/new', [
  validationCtrl.validate('createDecisions'),
  quizzesCrtl.renderDecisionFormWithErrors,
]);

router.get('/edit/:id', quizzesCrtl.renderEditForm);
// export the route from this file
module.exports = router;
