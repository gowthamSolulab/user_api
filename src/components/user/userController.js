import catchAsync from '../../helpers/catchAsync';
import { handleError, handleResponse } from '../../helpers/responseHandler';
import { create, get, update, getAll, deleteDoc } from './userServices';
import User from './userModal';

module.exports = {
  createUser: catchAsync(async (req, res) => {
    const data = await create(req.body, User);
    if (!data) return handleError(503, res);
    return handleResponse(201, data, res);
  }),

  getUser: catchAsync(async (req, res) => {
    const data = await get(req.params.id, User);
    if (!data) return handleError(401, res);

    return handleResponse(200, data, res);
  }),

  updateUser: catchAsync(async (req, res) => {
    const data = await update(req.params.id, req.body, User);
    if (!data) return handleError(401, res);

    return handleResponse(201, data, res);
  }),

  deleteUser: catchAsync(async (req, res) => {
    const data = await deleteDoc(req.params.id, User);
    if (!data) return handleError(401, res);

    return handleResponse(204, data, res);
  }),

  getAllUsers: catchAsync(async (req, res) => {
    const data = await getAll(User);
    if (!data) return handleResponse(200, 'zero users found ', res);

    return handleResponse(200, data, res);
  }),
};
