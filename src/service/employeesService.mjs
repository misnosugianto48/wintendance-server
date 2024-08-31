import employeeValidator from '../validator/employeeValidator.mjs';
import { validate } from '../validator/validate.mjs';
import { primaClient } from '../apps/database.mjs';
import { nanoid } from 'nanoid';
import { AuthorizationError } from '../exceptions/AuthorizationError.mjs';
import { NotFoundError } from '../exceptions/NotFoundError.mjs';

const addEmployee = async (userId, payload) => {
  const employee = validate(employeeValidator.addEmployeeValidator, payload);

  const newEmployee = {
    id: `employee-${nanoid(16)}`,
    user_id: userId,
    fullname: employee.fullname,
    NIP: employee.NIP,
    position_id: employee.positionId,
    job_type: employee.jobType,
    hire_date: employee.hireDate,
  };

  return await primaClient.employee.create({
    data: newEmployee,
    select: {
      id: true,
    },
  });
};

const getEmployees = async () => {
  const employees = await primaClient.employee.findMany({
    select: {
      id: true,
      user_id: true,
      user: {
        select: {
          username: true,
        },
      },
      fullname: true,
      NIP: true,
      job_type: true,
      annual_leave_amount: true,
      employee_picture: true,
      hire_date: true,
      position_id: true,
      position: {
        select: {
          position_name: true,
        },
      },
      creted_at: true,
      updated_at: true,
    },
  });

  return employees.map((employee) => ({
    id: employee.id,
    userId: employee.user_id,
    username: employee.user.username,
    fullname: employee.fullname,
    NIP: employee.NIP,
    jobType: employee.job_type,
    annualLeaveAmount: employee.annual_leave_amount,
    employeePicture: employee.employee_picture,
    hireDate: employee.hire_date,
    positionId: employee.position_id,
    positionName: employee.position.position_name,
    createdAt: employee.creted_at,
    updatedAt: employee.updated_at,
  }));
};

const getEmployeeById = async (userId, employeeId) => {
  const employee = await primaClient.employee.findUnique({
    where: {
      id: employeeId,
    },
    select: {
      id: true,
      user_id: true,
      user: {
        select: {
          username: true,
        },
      },
      fullname: true,
      NIP: true,
      job_type: true,
      annual_leave_amount: true,
      employee_picture: true,
      hire_date: true,
      position_id: true,
      position: {
        select: {
          position_name: true,
        },
      },
      creted_at: true,
      updated_at: true,
    },
  });

  if (!employee || employee.user_id !== userId) {
    throw new NotFoundError(
      'Employee not found or does not belong to the user'
    );
  }

  return {
    id: employee.id,
    userId: employee.user_id,
    username: employee.user.username,
    fullname: employee.fullname,
    NIP: employee.NIP,
    jobType: employee.job_type,
    annualLeaveAmount: employee.annual_leave_amount,
    employeePicture: employee.employee_picture,
    hireDate: employee.hire_date,
    positionId: employee.position_id,
    positionName: employee.position.position_name,
    createdAt: employee.creted_at,
    updatedAt: employee.updated_at,
  };
};

const editEmployeeById = async (userId, employeeId, payload) => {
  const employee = validate(employeeValidator.editEmployeeValidator, payload);

  const employeeCount = await primaClient.employee.findUnique({
    where: {
      id: employeeId,
    },
    select: {
      user_id: true,
    },
  });

  if (!employeeCount || employeeCount.user_id !== userId) {
    throw new NotFoundError(
      'Employee not found or does not belong to the user'
    );
  }

  const data = {};

  if (employee.fullname) {
    data.fullname = employee.fullname;
  }

  if (employee.NIP) {
    data.NIP = employee.NIP;
  }

  if (employee.positionId) {
    data.position_id = employee.positionId;
  }

  if (employee.jobType) {
    data.job_type = employee.jobType;
  }

  if (employee.hireDate) {
    data.hire_date = employee.hireDate;
  }

  return await primaClient.employee.update({
    where: {
      id: employeeId,
    },
    data: data,
    select: {
      id: true,
    },
  });
};

const editEmployeePictureById = async (userId, employeeId, payload) => {
  const employee = validate(
    employeeValidator.editEmployeePictureValidator,
    payload
  );

  const employeeCount = await primaClient.employee.findUnique({
    where: {
      id: employeeId,
    },
    select: {
      user_id: true,
    },
  });

  if (!employeeCount || employeeCount.user_id !== userId) {
    throw new NotFoundError(
      'Employee not found or does not belong to the user'
    );
  }

  const data = {};

  if (employee.employeePicture) {
    data.employee_picture = employee.employeePicture;
  }

  return await primaClient.employee.update({
    where: {
      id: employeeId,
    },
    data: data,
    select: {
      id: true,
    },
  });
};

// const editLeaveBalance = async (payload) => {};

const verifyOwner = async (ownerId, userId) => {
  const owner = await primaClient.employee.findUnique({
    where: {
      user_id: ownerId,
    },
    select: {
      user_id: true,
    },
  });

  if (!owner) {
    throw new NotFoundError('employee not found');
  }

  if (owner.user_id !== userId) {
    throw new AuthorizationError('restricted resource');
  }
};

export default {
  addEmployee,
  verifyOwner,
  getEmployees,
  getEmployeeById,
  editEmployeeById,
  editEmployeePictureById,
};
