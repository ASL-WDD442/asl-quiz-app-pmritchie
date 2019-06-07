// import the express router
const router = require('express').Router();
// GET /Questions route
const questionsCtrl = require('../controllers/questions');

router.get('/', questionsCtrl.getQuizQuestions);
// post works
router.post('/', questionsCtrl.createQuestion);
// get by id works
router.get('/:id', questionsCtrl.getOneById);
// put works
router.put('/:id', questionsCtrl.updateQuestion);
// delete works
router.delete('/:id', questionsCtrl.removeQuestion);

// export the route from this file
module.exports = router;
