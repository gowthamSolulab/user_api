import { check, validationResult } from 'express-validator';
import User from '../modals/userModal';

module.exports = {
  userValidationRules: () => {
    return [
      check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('email is not valid'),
      check('password')
        .isLength({ min: 6 })
        .withMessage('password must contain min 6 char'),
      check('mobileno').isMobilePhone().withMessage('mobileno is not valid'),
    ];
  },

  validateSignup: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res
      .status(422)
      .json({ status: 'fail', message: 'validation failed', extractedErrors });
  },

  duplicateValidation: async (req, res, next) => {
    const duplicate = await User.find({ email: req.body.email });
    if (duplicate.length === 0) return next();
    return res
      .status(422)
      .json({ status: 'fail', message: 'user already exists' });
  },
};
