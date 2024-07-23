import { nanoid } from "nanoid";
import { primaClient } from "../apps/database.mjs";
import { InvariantError } from "../exceptions/InvariantError.mjs";
import { AuthenticationError } from "../exceptions/AuthenticationError.mjs";
import { validate } from "../validator/validate.mjs";
import bcrypt from "bcrypt";
import userValidator from "../validator/userValidator.mjs";

const createUser = async (payload) => {
  const user = validate(userValidator.createUserValidator, payload);

  const usernameExist = await primaClient.user.findUnique({
    where: {
      username: user.username,
    },
  });

  if (usernameExist) {
    throw new InvariantError("username already exists");
  }

  const password = payload.password;
  const hash = await bcrypt.hash(password, 10);

  const newUser = {
    id: `user-${nanoid(10)}`,
    username: payload.username,
    password: hash,
    role: payload.role,
  };

  return primaClient.user.create({
    data: newUser,
    select: {
      id: true,
      username: true,
      role: true,
    },
  });
};

const verifyUserCredential = async (payload) => {
  const user = validate(userValidator.verifyUserCredentialValidator, payload);

  const validUser = await primaClient.user.findUnique({
    where: {
      username: payload.username,
    },
    select: {
      id: true,
      username: true,
      password: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });

  if (!validUser) {
    throw new AuthenticationError("credential not valid");
  }

  const matchPassword = bcrypt.compare(user.password, validUser.password);

  if (!matchPassword) {
    throw new AuthenticationError("credential not valid");
  }

  return {
    id: validUser.id,
    username: validUser.username,
    role: validUser.role,
    createdAt: validUser.created_at,
    updatedAt: validUser.updated_at,
  };
};

export default { createUser, verifyUserCredential };
