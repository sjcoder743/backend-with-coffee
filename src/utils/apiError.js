class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", error = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.success = false; // Typically, an error response is not a success

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };