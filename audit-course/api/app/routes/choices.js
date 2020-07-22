// import the express router
const router = require('express').Router();
// import the choice controller
const choiceCtrl = require('../controllers/choices');
// GET /choices route
router.get('/', choiceCtrl.getQuestionChoices);

router.get('/:id', choiceCtrl.getOneById);

router.post('/', choiceCtrl.createChoice);

router.put('/:id', choiceCtrl.updateChoice);

router.delete('/:id', choiceCtrl.removeChoice);

// export the route from this file
module.exports = router;
