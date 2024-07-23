import express from "express";
import authenticationsController from "../controller/authenticationsController.mjs";

const authenticationsRouter = new express.Router();

authenticationsRouter.post(
  "/authentications",
  authenticationsController.postAuthentication
);

export { authenticationsRouter };
