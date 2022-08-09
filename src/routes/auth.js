const router = require('express').Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const User = require('../models/user');
const tokenHandler = require('../handles/tokenHandler');
const validation = require('../handles/validation');

router.post(
  '/signup',
  body('fullname').isLength({ min: 3 }).withMessage(
    'Fullname must be at least 3 characters'
  ),
  body('phone').isLength({ min: 10, max: 11 }).withMessage(
    'Invalid phone number'
  ),
  body('username').isLength({ min: 8 }).withMessage(
    'Username must be at least 8 characters'
  ),
  body('password').isLength({ min: 8 }).withMessage(
    'Password must be at least 8 characters'
  ),
  body('confirmPassword').isLength({ min: 8 }).withMessage(
    'Confirm password must be at least 8 characters'
  ),
  body('username').custom(value => {
    return User.findOne({ username: value }).then(user => {
      if (user) {
        return Promise.reject('Username already used');
      }
    })
  }),
  body('phone').custom(value => {
    return User.findOne({ phone: value }).then(user => {
      if (user) {
        return Promise.reject('This phone number is already in use');
      }
    })
  }),
  validation.validate,
  authController.register,
)

router.post(
  '/login',
  validation.validate,
  authController.login,
)

router.post(
  '/verify-token',
  tokenHandler.verifyToken,
  (req, res) => {
    res.status(200).json({ user: req.user })
  }
)

module.exports = router;