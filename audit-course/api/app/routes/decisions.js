// import the express router
const router = require('express').Router();
// import the decision controller
const decisionCtrl = require('../controllers/decisions');
// GET /decisions route
router.get('/', decisionCtrl.getAll);

router.get('/public', decisionCtrl.getPublic);

// export the route from this file
module.exports = router;
