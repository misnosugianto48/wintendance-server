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

export default {
  createUserValidator,
  verifyUserCredentialValidator,
  editUsernameValidator,
};
