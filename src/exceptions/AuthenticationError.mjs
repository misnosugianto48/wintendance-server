import { ClientError } from "./ClientError.mjs";

class AuthenticationError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

export { AuthenticationError };
