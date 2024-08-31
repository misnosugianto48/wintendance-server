import Joi from "joi";

const createUserValidator = Joi.object({
  username: Joi.string().min(5).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().optional(),
});

const verifyUserCredentialValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const editUsernameValidator = Joi.object({
  username: Joi.string().min(5).optional(),
});

const editUserPasswordValidator = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
});
export default {
  createUserValidator,
  verifyUserCredentialValidator,
  editUsernameValidator,
  editUserPasswordValidator,
};
