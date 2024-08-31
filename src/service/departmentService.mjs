import { primaClient } from "../apps/database.mjs";
import { NotFoundError } from "../exceptions/NotFoundError.mjs";
import departmentValidator from "../validator/departmentValidator.mjs";
import { validate } from "../validator/validate.mjs";

const addDepartment = async (payload) => {
  const department = validate(
    departmentValidator.addDepartmentValidator,
    payload
  );

  const newDepartment = {
    department_name: department.departmentName,
    department_description: department.departmentDescription,
  };

  return await primaClient.department.create({
    data: newDepartment,
    select: {
      id: true,
    },
  });
};

const getDepartments = async () => {
  const departments = await primaClient.department.findMany({
    select: {
      id: true,
      department_name: true,
      department_description: true,
      created_at: true,
      updated_at: true,
    },
  });

  return departments.map((department) => ({
    id: department.id,
    departmentName: department.department_name,
    departmentDescription: department.department_description,
    createdAt: department.created_at,
    updatedAt: department.updated_at,
  }));
};

const getDepartmentById = async (departmentId) => {
  const department = await primaClient.department.findUnique({
    where: {
      id: departmentId,
    },
    select: {
      id: true,
      department_name: true,
      department_description: true,
      created_at: true,
      updated_at: true,
    },
  });

  if (!department) {
    throw new NotFoundError("department not found");
  }

  return {
    id: department.id,
    departmentName: department.department_name,
    departmentDescription: department.department_description,
    createdAt: department.created_at,
    updatedAt: department.updated_at,
  };
};

const editDepartmentById = async (departmentId, payload) => {
  const department = validate(
    departmentValidator.editDepartmentValidator,
    payload
  );

  const departmentCount = await primaClient.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  if (!departmentCount) {
    throw new NotFoundError("department not found");
  }

  const data = {};

  if (department.departmentName) {
    data.department_name = department.departmentName;
  }

  if (department.departmentDescription) {
    data.department_description = department.departmentDescription;
  }

  return await primaClient.department.update({
    where: {
      id: departmentId,
    },
    data: data,
    select: {
      id: true,
    },
  });
};

const deleteDepartmentById = async (departmentId) => {
  const departmentCount = await primaClient.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  if (!departmentCount) {
    throw new NotFoundError("department not found");
  }

  return await primaClient.department.delete({
    where: {
      id: departmentId,
    },
  });
};

export default {
  addDepartment,
  getDepartments,
  getDepartmentById,
  editDepartmentById,
  deleteDepartmentById,
};
