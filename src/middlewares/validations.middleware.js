const {body, validationResult} = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: errors.mapped(),
    });
  }
  next()
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Must be a valid email'),
  body('password')
  .notEmpty()
  .withMessage('Password is required')
  .isLength({min: 6})
  .withMessage('Password must be at least 6 characters long'),
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.updateUserValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('newPassword')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.createRepairValidation = [
  body('date').notEmpty().withMessage('Date is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('motorsNumber').notEmpty().withMessage('Motors number is required'),
];