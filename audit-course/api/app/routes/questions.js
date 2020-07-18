// import the express router
const router = require('express').Router();
// import the Question controller
const questionCtrl = require('../controllers/questions');
// GET /questions route
router.get('/', questionCtrl.getAll);

router.get('/public', questionCtrl.getPublic);

router.get('/:id', questionCtrl.getOneById);

router.post('/', questionCtrl.createQuestion);

router.put('/:id', questionCtrl.updateQuestion);

router.delete('/:id', questionCtrl.removeQuestion);

// export the route from this file
module.exports = router;
