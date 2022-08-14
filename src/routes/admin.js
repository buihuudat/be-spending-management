const router = require('express').Router();
const adminController = require('../controllers/admin');
const validation = require('../handles/validation');

router.post(
  '/delete',
  validation.validate,
  adminController.delete
)

module.exports = router;