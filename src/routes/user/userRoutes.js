import express from "express";
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "./userController";
import {
  validateSignup,
  userValidationRules,
} from "../../middleware/userValidation";

const router = express.Router();

router
  .route("/")
  .post(userValidationRules(), validateSignup, createUser)
  .get(getAllUsers);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
