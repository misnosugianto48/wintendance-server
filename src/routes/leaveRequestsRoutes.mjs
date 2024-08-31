import express from 'express';
import leaveRequestsController from '../controller/leaveRequestsController.mjs';
import { authMiddleware } from '../middleware/authMidlleware.mjs';

const leaveRouter = new express.Router();

leaveRouter.post(
  '/leave-requests',
  authMiddleware(),
  leaveRequestsController.postLeaveRequest
);

leaveRouter.patch(
  '/leave-requests/:leaveId',
  authMiddleware(),
  leaveRequestsController.patchLeaveRequest
);

export { leaveRouter };
