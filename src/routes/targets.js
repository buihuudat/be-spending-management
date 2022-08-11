const router = require('express').Router();
const authentication = require('../handles/validation');
const targetController = require('../controllers/targets');

router.post(
  '/',
  authentication.validate,
  targetController.get
)


module.exports = router;