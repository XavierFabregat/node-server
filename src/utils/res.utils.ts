import type { Response } from 'express';

export class StandardResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;

  constructor(
    success: boolean,
    message: string,
    data?: T,
    statusCode?: number,
    error?: string
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
    this.statusCode = statusCode!;
  }

  static success<T>(
    data: T,
    message = 'Operation successful',
    statusCode = 200
  ): StandardResponse<T> {
    return new StandardResponse<T>(true, message, data, statusCode);
  }

  static error(
    error: string,
    message = 'Operation failed',
    statusCode = 400
  ): StandardResponse {
    return new StandardResponse(false, message, undefined, statusCode, error);
  }
}

export class ResponseUtil {
  static send<T>(res: Response, responseObject: StandardResponse<T>): void {
    res.status(responseObject.statusCode).json(responseObject);
  }

  static sendSuccess<T>(
    res: Response,
    data: T,
    message = 'Operation successful',
    statusCode = 200
  ): void {
    const response = StandardResponse.success(data, message, statusCode);
    this.send(res, response);
  }

  static sendError(
    res: Response,
    error: string,
    message = 'Operation failed',
    statusCode = 400
  ): void {
    const response = StandardResponse.error(error, message, statusCode);
    this.send(res, response);
  }
}
