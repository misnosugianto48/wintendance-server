import authenticationService from "../service/authenticationService.mjs";
import usersService from "../service/usersService.mjs";
import tokenManager from "../utils/tokenManager.mjs";

const postAuthentication = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await usersService.verifyUserCredential(payload);

    const accessToken = tokenManager.generateAccessToken({
      id: result.id,
      username: result.username,
      role: result.role,
    });

    const refreshToken = tokenManager.generateRefreshToken({
      id: result.id,
      username: result.username,
      role: result.role,
    });

    await authenticationService.addRefreshToken(refreshToken);

    res.status(201).json({
      status: "created",
      message: "authentication has been created succefully",
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: {
          id: result.id,
          username: result.username,
          role: result.role,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const putAuthentication = async (req, res, next) => {
  try {
    const payload = req.body;
    await authenticationService.verifyRefreshToken(payload);

    const accessToken = tokenManager.generateAccessToken({
      id: req.userId,
      username: req.username,
      role: req.role,
    });

    res.status(200).json({
      status: "success",
      message: "authentication has been updated succefully",
      data: {
        accessToken: accessToken,
      },
    });
  } catch (e) {
    next(e);
  }
};

const deleteAuthentication = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    await authenticationService.verifyRefreshToken({ refreshToken });
    await authenticationService.deleteRefreshToken({ refreshToken });

    res.status(200).json({
      status: "success",
      message: "authentication has been deleted succefully",
    });
  } catch (e) {
    next(e);
  }
};

const truncateToken = async (req, res, next) => {
  try {
    await authenticationService.truncateToken();
    res.status(200).json({
      status: "success",
      message: "token has been truncate",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  postAuthentication,
  putAuthentication,
  deleteAuthentication,
  truncateToken,
};
