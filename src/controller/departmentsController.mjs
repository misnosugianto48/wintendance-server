import departmentService from "../service/departmentService.mjs";

const postDepartment = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await departmentService.addDepartment(payload);

    res.status(201).json({
      status: "created",
      message: "department has been created successfully",
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getDepartments = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      data: await departmentService.getDepartments(),
    });
  } catch (e) {
    next(e);
  }
};

const getDepartmentById = async (req, res, next) => {
  try {
    const departmentId = Number(req.params.departmentId);

    res.status(200).json({
      status: "success",
      data: await departmentService.getDepartmentById(departmentId),
    });
  } catch (e) {
    next(e);
  }
};

const patchDepartmentById = async (req, res, next) => {
  try {
    const departmentId = Number(req.params.departmentId);
    const payload = req.body;

    res.status(200).json({
      status: "success",
      message: "department has been updated successfully",
      data: await departmentService.editDepartmentById(departmentId, payload),
    });
  } catch (e) {
    next(e);
  }
};

const deleteDepartmentById = async (req, res, next) => {
  try {
    const departmentId = Number(req.params.departmentId);
    await departmentService.deleteDepartmentById(departmentId),
      res.status(200).json({
        status: "success",
        message: "department has been deleted successfully",
      });
  } catch (e) {
    next(e);
  }
};

export default {
  postDepartment,
  getDepartments,
  getDepartmentById,
  patchDepartmentById,
  deleteDepartmentById,
};
