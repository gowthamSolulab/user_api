import catchAsync from "../../helpers/catchAsync";
import response from "../../helpers/response";
import {
  createService,
  getService,
  updateService,
  getAllService,
  deleteService,
} from "../../services/userServices";

module.exports = {
  createUser: catchAsync(async (req, res) => {
    try {
      const data = await createService(req, res);
      res.data = data;
      return response(201, data, res);
    } catch (err) {
      console.log(err);
    }
  }),
  getUser: catchAsync(async (req, res) => {
    const data = await getService(req, res);
    res.data = data;
    return response(200, data, res);
  }),
  updateUser: catchAsync(async (req, res) => {
    const data = await updateService(req, res);
    res.data = data;
    return response(201, data, res);
  }),
  deleteUser: catchAsync(async (req, res) => {
    const data = await deleteService(req, res);
    res.data = data.username;
    return response(204, data, res);
  }),
  getAllUsers: catchAsync(async (req, res) => {
    const data = await getAllService(req, res);
    res.data = data;
    return response(200, data, res);
  }),
};
