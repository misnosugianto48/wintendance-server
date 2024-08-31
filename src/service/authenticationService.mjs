import { primaClient } from "../apps/database.mjs";
import { NotFoundError } from "../exceptions/NotFoundError.mjs";

const addRefreshToken = async (payload) => {
  return await primaClient.authentication.create({
    data: {
      token: payload,
    },
  });
};

const verifyRefreshToken = async (payload) => {
  const token = await primaClient.authentication.findUnique({
    where: {
      token: payload.refreshToken,
    },
    select: {
      token: true,
    },
  });

  if (!token) {
    throw new NotFoundError("token not found");
  }

  return token;
};

const deleteRefreshToken = async (payload) => {
  const token = await primaClient.authentication.delete({
    where: {
      token: payload.refreshToken,
    },
  });

  if (!token) {
    throw new NotFoundError("token not found");
  }

  return token;
};

const truncateToken = async () => {
  return await primaClient.authentication.deleteMany({});
};

export default {
  addRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken,
  truncateToken,
};
