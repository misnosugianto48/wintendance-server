import express from "express";
import authenticationsController from "../controller/authenticationsController.mjs";
import { verifyRefreshToken } from "../middleware/authMidlleware.mjs";

const authenticationsRouter = new express.Router();

authenticationsRouter.post(
  "/authentications",
  authenticationsController.postAuthentication
);

authenticationsRouter.post(
  "/authentications/truncate",
  authenticationsController.truncateToken
);

authenticationsRouter.put(
  "/authentications/",
  verifyRefreshToken,
  authenticationsController.putAuthentication
);

authenticationsRouter.delete(
  "/authentications/",
  verifyRefreshToken,
  authenticationsController.deleteAuthentication
);

export { authenticationsRouter };
