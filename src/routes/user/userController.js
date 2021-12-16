import catchAsync from '../../helpers/catchAsync';
import { handleError, handleResponse } from '../../helpers/responseHandler';
import {
  createService,
  getService,
  updateService,
  getAllService,
  deleteService,
} from '../../services/userServices';

module.exports = {
  createUser: catchAsync(async (req, res) => {
    const data = await createService(req.body);
    if (!data) return handleError(503, res);
    return handleResponse(201, data, res);
  }),
  getUser: catchAsync(async (req, res) => {
    const data = await getService(req.params.id);
    if (!data) return handleError(401, res);
    return handleResponse(200, data, res);
  }),
  updateUser: catchAsync(async (req, res) => {
    const data = await updateService(req.params.id, req.body);
    if (!data) return handleError(401, res);
    return handleResponse(201, data, res);
  }),
  deleteUser: catchAsync(async (req, res) => {
    const data = await deleteService(req.params.id);
    if (!data) return handleError(401, res);
    return response(204, data, res);
  }),
  getAllUsers: catchAsync(async (req, res) => {
    const data = await getAllService();
    if (!data) return response(200, 'zero users found ', res);
    return response(200, data, res);
  }),
};
