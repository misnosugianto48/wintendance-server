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

export default { postAuthentication };
