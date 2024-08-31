import express from "express";
import positionsController from "../controller/positionsController.mjs";
import { authMiddleware } from "../middleware/authMidlleware.mjs";

const positionsRouter = new express.Router();

positionsRouter.post(
  "/positions",
  authMiddleware("ADMIN"),
  positionsController.postPosition
);
positionsRouter.get(
  "/positions",
  authMiddleware(),
  positionsController.getPositions
);
positionsRouter.get(
  "/positions/:positionId",
  authMiddleware(),
  positionsController.getPositionById
);
positionsRouter.patch(
  "/positions/:positionId",
  authMiddleware("ADMIN"),
  positionsController.patchPositionById
);
positionsRouter.delete(
  "/positions/:positionId",
  authMiddleware("ADMIN"),
  positionsController.deletePositionById
);

export { positionsRouter };
