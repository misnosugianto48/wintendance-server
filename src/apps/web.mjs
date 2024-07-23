import express from "express";
import morgan from "morgan";
import { userRoutes } from "../routes/usersRoutes.mjs";
import { authenticationsRouter } from "../routes/authenticationsRoutes.mjs";
import { errorMidlleware } from "../middleware/errorMidlleware.mjs";

export const web = express();
web.use(express.json());
web.use(express.urlencoded({ extended: true }));
web.use(morgan("dev"));

web.use("/api/v1", userRoutes);
web.use("/api/v1", authenticationsRouter);

web.use(errorMidlleware);
