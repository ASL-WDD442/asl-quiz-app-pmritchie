// import the express router
const router = require('express').Router();
// load the controller
const choicesCrtl = require('../controllers/choices');
const validationCtrl = require('../controllers/validation');

router.get('/new', choicesCrtl.createChoice);

router.get('/edit/:choiceId', choicesCrtl.renderEditForm);

router.post(
  '/new',
  validationCtrl.validate('createChoice'),
  choicesCrtl.renderChoiceFormWithErrors,
  choicesCrtl.saveNewChoice,
);

router.post(
  '/edit/:choiceId',
  validationCtrl.validate('editChoice'),
  choicesCrtl.renderChoiceFormWithErrors,
  choicesCrtl.saveEditChoice,
);

router.get('/delete/:choiceId', choicesCrtl.deleteChoice);

module.exports = router;
