import express from "express";
import departmentsController from "../controller/departmentsController.mjs";
import { authMiddleware } from "../middleware/authMidlleware.mjs";

const departmentsRouter = new express.Router();

departmentsRouter.post(
  "/departments",
  authMiddleware("ADMIN"),
  departmentsController.postDepartment
);

departmentsRouter.get(
  "/departments",
  authMiddleware(),
  departmentsController.getDepartments
);

departmentsRouter.get(
  "/departments/:departmentId",
  authMiddleware(),
  departmentsController.getDepartmentById
);

departmentsRouter.patch(
  "/departments/:departmentId",
  authMiddleware("ADMIN"),
  departmentsController.patchDepartmentById
);

departmentsRouter.delete(
  "/departments/:departmentId",
  authMiddleware("ADMIN"),
  departmentsController.deleteDepartmentById
);

export { departmentsRouter };
