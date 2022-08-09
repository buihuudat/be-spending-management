const router = require('express').Router();
const { body } = require('express-validator');
const User = require('../models/user');
const tokenHandler = require('../handles/tokenHandler');
const validation = require('../handles/validation');
const userController = require('../controllers/user');

// get user
router.post(
  '/info',
  validation.validate,
  userController.getUser,
)

// get all users
router.post(
  '/get-all-user',
  validation.validate,
  userController.getAllUser,
)

// delete user
router.post(
  '/delete',
  validation.validate,
  userController.deleteUser,
)


// update user
router.put(
  '/update',
  body('phone').isLength({ min: 10, max: 11 }).withMessage(
    'Invalid Phone'
  ),
  body('password').isLength({ min: 8 }).withMessage(
    'Password must be at least 8 characters'
  ),
  body('confirmPassword').isLength({ min: 8 }).withMessage(
    'Confirm Password must be at least 8 characters'
  ),
  body('phone').custom(value => {
    return User.find({ phone: value }).then(user => {
      if (user.length > 1) {
        return Promise.reject('This phone number is already in use');
      }
    })
  }),
  validation.validate,
  tokenHandler.verifyToken,
  userController.updateUser,
)

// update image of user
router.put(
  '/update-image',
  validation.validate,
  tokenHandler.verifyToken,
  userController.updateUserImage,
)

module.exports = router;