import Joi from 'joi';

const addEmployeeValidator = Joi.object({
  fullname: Joi.string().min(5).required(),
  NIP: Joi.string().min(5).required(),
  positionId: Joi.required(),
  jobType: Joi.string().optional(),
  hireDate: Joi.date().required(),
});

const editEmployeeValidator = Joi.object({
  fullname: Joi.string().min(5).optional(),
  NIP: Joi.string().min(5).optional(),
  positionId: Joi.optional(),
  jobType: Joi.string().optional(),
  hireDate: Joi.date().optional(),
});

const editEmployeePictureValidator = Joi.object({
  employeePicture: Joi.string().optional(),
});
export default {
  addEmployeeValidator,
  editEmployeeValidator,
  editEmployeePictureValidator,
};
