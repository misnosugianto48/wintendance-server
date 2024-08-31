import Joi from "joi";

const addPositionsValidator = Joi.object({
  positionName: Joi.string().min(3).required(),
  positionDescription: Joi.string().required(),
  departmentId: Joi.number().required(),
});

const editPositionsValidator = Joi.object({
  positionName: Joi.string().min(3).optional(),
  positionDescription: Joi.string().optional(),
  departmentId: Joi.number().optional(),
});

export default { addPositionsValidator, editPositionsValidator };
