// import the express router
const router = require('express').Router();
// GET /decisions route
const choicesCtrl = require('../controllers/choices');
const protectedRoute = require('../utils/protectedRoute');

router.get('/', choicesCtrl.getQuestionChoices);
// by id works
router.get('/:id', choicesCtrl.getOneById);
// post works
router.post('/', protectedRoute, choicesCtrl.createChoice);
// does not work
router.put('/:id', protectedRoute, choicesCtrl.updateChoice);
// does work
router.delete('/:id', protectedRoute, choicesCtrl.removeChoice);

// export the route from this file
module.exports = router;
