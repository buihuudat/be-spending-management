const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/statistics', require('./statistics'));
router.use('/targets', require('./targets'));
router.use('/admin', require('./admin'));

module.exports = router;
