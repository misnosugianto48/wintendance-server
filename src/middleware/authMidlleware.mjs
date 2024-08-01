import { AuthenticationError } from "../exceptions/AuthenticationError.mjs";
import { AuthorizationError } from "../exceptions/AuthorizationError.mjs";
import Jwt from "jsonwebtoken";
import { config } from "../utils/config.mjs";
import { InvariantError } from "../exceptions/InvariantError.mjs";

const authMiddleware =
  (requiredRole = "EMPLOYEE") =>
  (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AuthenticationError("unauthorized"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new AuthenticationError("unauthorized"));
    }

    try {
      const data = Jwt.verify(token, config.jwtToken.accessToken);

      req.userId = data.id;
      req.role = data.role;

      if (data.role !== requiredRole && requiredRole !== "EMPLOYEE") {
        return next(new AuthorizationError(`requires ${requiredRole} role`));
      }
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return next(new AuthenticationError("token expired"));
      }
      next(new AuthorizationError("not enough access"));
    }
  };

const verifyRefreshToken = (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new InvariantError("invalid token"));
  }

  try {
    const decodedToken = Jwt.decode(refreshToken);
    Jwt.verify(refreshToken, config.jwtToken.refreshToken);

    req.userId = decodedToken.id;
    req.username = decodedToken.username;
    req.role = decodedToken.role;
    // req.refreshToken = refreshToken;
    return next();
  } catch (error) {
    if (error) {
      return next(new InvariantError("invalid token"));
    }
  }
};

export { authMiddleware, verifyRefreshToken };
