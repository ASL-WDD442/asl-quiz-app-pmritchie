// import the express router
const router = require('express').Router();
// GET /decisions route
const choicesCtrl = require('../controllers/choices');

router.get('/?questionId=', choicesCtrl.getQuestionChoices);

router.get('/:id', choicesCtrl.getOneById);

router.post('/', choicesCtrl.createChoice);

router.put('/:id', choicesCtrl.updateChoice);

router.delete('/:id', choicesCtrl.removeChoice);

// export the route from this file
module.exports = router;
