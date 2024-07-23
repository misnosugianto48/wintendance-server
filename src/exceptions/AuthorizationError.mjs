import { ClientError } from "./ClientError.mjs";

class AuthorizationError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

export { AuthorizationError };
