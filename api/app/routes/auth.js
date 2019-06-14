
const router = require('express').Router();

const authCtrl = require('../controllers/auth');
// POST /auth/slack - receives a code and will exchange it for a access_token
router.post('/slack', authCtrl.exchangeCode);

router.post('/signup', authCtrl.signUp);

router.post('/login', authCtrl.login);

module.exports = router;
