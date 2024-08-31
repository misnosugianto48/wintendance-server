import Joi from "joi";

const addDepartmentValidator = Joi.object({
  departmentName: Joi.string().min(3).required(),
  departmentDescription: Joi.string().required(),
});

const editDepartmentValidator = Joi.object({
  departmentName: Joi.string().min(3).optional(),
  departmentDescription: Joi.string().optional(),
});

export default { addDepartmentValidator, editDepartmentValidator };
