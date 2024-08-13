import express from 'express';
import employessControllerr from '../controller/employessControllerr.mjs';
import { authMiddleware } from '../middleware/authMidlleware.mjs';

const employeeRouter = new express.Router();

employeeRouter.post(
  '/employees',
  authMiddleware(),
  employessControllerr.postEmployee
);

employeeRouter.get(
  '/employees',
  authMiddleware('ADMIN'),
  employessControllerr.getEmployees
);

employeeRouter.get(
  '/employees/:employeeId',
  authMiddleware(),
  employessControllerr.getEmployeeById
);

employeeRouter.patch(
  '/employees/:employeeId',
  authMiddleware(),
  employessControllerr.patchEmployeeById
);

export { employeeRouter };
