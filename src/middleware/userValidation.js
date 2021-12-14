import { check, validationResult } from "express-validator";
import errorResponse from "../helpers/errorResponse";

module.exports = {
  userValidationRules: () => {
    return [
      check("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("email is not valid"),
      check("password")
        .isLength({ min: 6 })
        .withMessage("password must contain min 6 char"),
      check("mobileno").isMobilePhone().withMessage("mobileno is not valid"),
    ];
  },

  validateSignup: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return errorResponse(422, extractedErrors, res);
  },
};
