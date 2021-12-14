import User from "../modals/userModal";
import errorResponse from "../helpers/errorResponse";
import catchAsync from "../helpers/catchAsync";

module.exports = {
  createService: async (req, res) => {
    const { username, email, password, mobileno, countryCode } = req.body;
    const newUser = await User.create({
      username,
      email,
      password,
      mobileno,
      countryCode,
    });
    if (!newUser) return errorResponse(400, "failed", res);
    return newUser;
  },
  getService: async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw errorResponse(404, "no user found", res);
    return user;
  },
  getAllService: async (req, res) => {
    const user = await User.find();
    if (!user) return errorResponse(404, "no users found", res);
    return user;
  },
  updateService: async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) return errorResponse(404, "no user found", res);
    return user;
  },
  deleteService: async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return errorResponse(404, "no user found", res);
    const deletedUser = await User.deleteOne(user);
    return deletedUser;
  },
};
