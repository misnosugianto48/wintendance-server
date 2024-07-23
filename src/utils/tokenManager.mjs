import Jwt from "jsonwebtoken";
import { config } from "./config.mjs";

const generateAccessToken = (payload) => {
  return Jwt.sign(payload, config.jwtToken.accessToken, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (payload) => {
  return Jwt.sign(payload, config.jwtToken.refreshToken);
};

export default { generateAccessToken, generateRefreshToken };
