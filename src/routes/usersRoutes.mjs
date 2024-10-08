import express from "express";
import usersController from "../controller/usersController.mjs";
import { authMiddleware } from "../middleware/authMidlleware.mjs";

const userRoutes = new express.Router();

userRoutes.post("/admin", usersController.createAdmin);
userRoutes.post("/users", authMiddleware("ADMIN"), usersController.postUsers);
userRoutes.patch(
  "/users/:userId",
  authMiddleware(),
  usersController.patchUsers
);
userRoutes.patch(
  "/users/:userId/change-password",
  authMiddleware(),
  usersController.patchChangePassword
);
userRoutes.delete(
  "/users/:userId",
  authMiddleware("ADMIN"),
  usersController.deleteUser
);

export { userRoutes };
