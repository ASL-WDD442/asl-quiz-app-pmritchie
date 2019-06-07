// import the express router
const router = require('express').Router();
// GET /decisions route
const choicesCtrl = require('../controllers/choices');

router.get('/', choicesCtrl.getQuestionChoices);
// by id works
router.get('/:id', choicesCtrl.getOneById);
// post works
router.post('/', choicesCtrl.createChoice);
// does not work
router.put('/:id', choicesCtrl.updateChoice);
// does work
router.delete('/:id', choicesCtrl.removeChoice);

// export the route from this file
module.exports = router;
