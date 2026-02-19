class HttpError extends Error {
  public code: number;
  constructor(message: string, code = 500) {
    super(message);
    this.code = code;
  }
}

class NotFoundError extends HttpError {
  constructor(message = 'resource not found') {
    super(message, 404);
  }
}

export default { HttpError, NotFoundError };