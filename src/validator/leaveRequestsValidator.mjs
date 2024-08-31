import Joi from 'joi';

const addLeaveRequestValidator = Joi.object({
  leaveStartDate: Joi.date().required(),
  leaveEndDate: Joi.date().required(),
  reason: Joi.string().required(),
  numberOfLeave: Joi.number().required(),
});

const editLeaveRequestValidator = Joi.object({
  leaveStartDate: Joi.date().optional(),
  leaveEndDate: Joi.date().optional(),
  reason: Joi.string().optional(),
  numberOfLeave: Joi.number().optional(),
});

export default { addLeaveRequestValidator, editLeaveRequestValidator };
