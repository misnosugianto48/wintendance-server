class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = this.name;
    this.statusCode = statusCode;
  }
}

export { ClientError };
