// import the express router
const router = require('express').Router();
// load the controller
const choicesCrtl = require('../controllers/choices');
const validationCtrl = require('../controllers/validation');

router.get('/', choicesCrtl.createChoice);

router.get('/new', choicesCrtl.createChoice);
router.get('/edit/:choiceId', choicesCrtl.renderEditForm);

router.post('/new',
  validationCtrl.validate('createChoice'),
  choicesCrtl.renderDecisionFormWithErrors,
  choicesCrtl.saveNewChoice);

router.post('/edit/:choiceId',
  validationCtrl.validate('editChoice'),
  choicesCrtl.renderDecisionFormWithErrors,
  choicesCrtl.saveNewChoice);

module.exports = router;
