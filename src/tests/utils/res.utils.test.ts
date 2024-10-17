import { StandardResponse, ResponseUtil } from '../../utils/res.utils';
import { response, Response } from 'express';

describe('ResponseUtil', () => {
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  } as unknown as Response;

  describe('ResponseUtil Class', () => {
    it('should send a standard success response', () => {
      // mock response util send private method
      const mockStandardSuccessResponse = {
        data: expect.any(Object),
        message: expect.any(String),
        error: undefined,
        statusCode: 200,
        success: true,
      };
      jest.spyOn(ResponseUtil, 'send').mockImplementation((res, response) => {
        res.status(res.statusCode).json({
          success: true,
          message: 'Operation successful',
          data: 'test',
        });
      });

      ResponseUtil.sendSuccess(mockResponse, {
        data: 'test',
      });

      // expect send to be called with the response
      expect(ResponseUtil.send).toHaveBeenCalledWith(
        mockResponse,
        mockStandardSuccessResponse
      );
    });

    it('should send a standard error response', () => {
      const mockStandardErrorResponse = {
        data: undefined,
        message: 'Operation failed',
        error: 'test',
        statusCode: 400,
        success: false,
      };

      jest.spyOn(ResponseUtil, 'send').mockImplementation((res, response) => {
        res.status(res.statusCode).json({
          success: false,
          message: 'Operation failed',
          error: 'test',
        });
      });

      ResponseUtil.sendError(mockResponse, 'test');

      expect(ResponseUtil.send).toHaveBeenCalledWith(
        mockResponse,
        mockStandardErrorResponse
      );
    });
  });

  describe('StandardResponse Class', () => {
    it('should return a standard success response', () => {
      const mockStandardSuccessResponse = {
        data: 'test',
        message: 'Operation successful',
        error: undefined,
        statusCode: 200,
        success: true,
      };

      const response = StandardResponse.success('test');

      expect(response).toEqual(mockStandardSuccessResponse);
    });

    it('should return a standard error response', () => {
      const mockStandardErrorResponse = {
        data: undefined,
        message: 'Operation failed',
        error: 'test',
        statusCode: 400,
        success: false,
      };

      const response = StandardResponse.error('test');

      expect(response).toEqual(mockStandardErrorResponse);
    });
  });
});
