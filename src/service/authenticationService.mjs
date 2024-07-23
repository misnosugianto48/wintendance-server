import { primaClient } from "../apps/database.mjs";

const addRefreshToken = async (payload) => {
  return await primaClient.authentication.create({
    data: {
      token: payload,
    },
  });
};

const verifyRefreshToken = async (payload) => {};

const deleteRefreshToken = async (payload) => {};

export default { addRefreshToken, verifyRefreshToken, deleteRefreshToken };
