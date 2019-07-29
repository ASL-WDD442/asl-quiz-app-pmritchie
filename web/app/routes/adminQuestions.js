// import the express router
const router = require('express').Router();
// load the controller
const questionsCrtl = require('../controllers/questions');
const validationCtrl = require('../controllers/validation');

router.get('/new', questionsCrtl.createQuestion);

router.get('/edit/:questionId', questionsCrtl.renderEditForm);

router.post('/edit/:questionId',
  validationCtrl.validate('editQuestion'),
  questionsCrtl.renderQuestionFormWithErrors,
  questionsCrtl.saveQuestion);

router.post('/new',
  validationCtrl.validate('createQuestion'),
  questionsCrtl.renderQuestionFormWithErrors,
  questionsCrtl.saveNewQuestion);

router.get('/:id', questionsCrtl.getQuestionDetail);

router.get('/delete/:questionId', questionsCrtl.deleteQuestion);
module.exports = router;
