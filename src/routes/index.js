const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/statistics', require('./statistics'));

module.exports = router;
