import { NextFunction, Request, Response } from "express";

const errorHandler = (error: unknown, _req: Request, _res: Response, next: NextFunction) =>  {
  console.error('inside errorHandler', error);
  next();
};

export default { errorHandler };