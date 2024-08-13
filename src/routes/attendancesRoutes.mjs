import express from 'express';
import attendancesController from '../controller/attendancesController.mjs';
import { authMiddleware } from '../middleware/authMidlleware.mjs';

const attendRouter = new express.Router();

attendRouter.post(
  '/attendances',
  authMiddleware(),
  attendancesController.postAttendance
);

attendRouter.put(
  '/attendances/:employeeId',
  authMiddleware(),
  attendancesController.patchAttendance
);

export { attendRouter };
