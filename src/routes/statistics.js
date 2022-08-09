const router = require('express').Router();
const authentication = require('../handles/validation');
const statisticsController = require('../controllers/statistics');
const { body } = require('express-validator');

router.post(
  '/create',
  authentication.validate,
  statisticsController.create,
)

router.post(
  '/getAll',
  authentication.validate,
  statisticsController.getAll,
)

router.put(
  '/update',
  body('date').trim().isEmpty().withMessage(
    'Please enter the date'
  ),
  body('name').trim().isEmpty().withMessage(
    'Please enter the name'
  ),
  body('amountOfMoney').trim().isEmpty().withMessage(
    'Please enter the money'
  ),
  authentication.validate,
  statisticsController.update,
)

router.post(
  '/delete',
  authentication.validate,
  statisticsController.delete,
)

module.exports = router;