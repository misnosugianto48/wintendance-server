import employeesService from '../service/employeesService.mjs';

const postEmployee = async (req, res, next) => {
  try {
    const userId = req.userId;
    const payload = req.body;

    const result = await employeesService.addEmployee(userId, payload);

    res.status(201).json({
      status: 'created',
      message: 'employee has been created successfully',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getEmployees = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      data: await employeesService.getEmployees(),
    });
  } catch (e) {
    next(e);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const userId = req.userId;
    const employeeId = req.params.employeeId;

    // await employeesService.verifyOwner(userId, userId);
    res.status(200).json({
      status: 'success',
      data: await employeesService.getEmployeeById(userId, employeeId),
    });
  } catch (e) {
    next(e);
  }
};

const patchEmployeeById = async (req, res, next) => {
  try {
    const userId = req.userId;
    const employeeId = req.params.employeeId;
    const payload = req.body;

    res.status(200).json({
      status: 'success',
      message: 'employee has been updated successfully',
      data: await employeesService.editEmployeeById(
        userId,
        employeeId,
        payload
      ),
    });
  } catch (e) {
    next(e);
  }
};

export default {
  postEmployee,
  getEmployees,
  getEmployeeById,
  patchEmployeeById,
};
