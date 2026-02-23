class HttpError extends Error {
  public code: number;
  constructor(message = 'unexpected error occurred', code = 500) {
    super(message);
    this.code = code;
  }
}

class NotFoundError extends HttpError {
  constructor(message = 'resource not found') {
    super(message, 404);
  }
}

class ValidationError extends HttpError {
  constructor(message = 'invalid id format') {
    super(message, 400);
  }
}

export default { HttpError, NotFoundError, ValidationError };