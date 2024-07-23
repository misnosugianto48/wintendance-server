import express from "express";
import usersController from "../controller/usersController.mjs";

const userRoutes = new express.Router();

userRoutes.post("/admin", usersController.createAdmin);

export { userRoutes };
