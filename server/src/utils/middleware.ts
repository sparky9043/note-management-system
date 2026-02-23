import { NextFunction, Request, Response } from "express";
import httpErrors from "../errors/httpErrors";

const errorHandler = (error: unknown, _req: Request, res: Response, next: NextFunction) =>  {
  console.error('inside errorHandler', error);

  if (error instanceof httpErrors.HttpError) {
    
    res.status(error.code).json({
      status: 'error',
      code: error.code,
      message: error.message,
    });
  };
  
  next();
};

export default { errorHandler };