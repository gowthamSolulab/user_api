import express from 'express';
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from './userController';
import {
  validateSignup,
  userValidationRules,
  duplicateValidation,
} from '../../middleware/userValidator';

const router = express.Router();

router
  .route('/')
  .post(userValidationRules(), validateSignup, duplicateValidation, createUser)
  .get(getAllUsers);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
