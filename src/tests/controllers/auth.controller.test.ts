import { Request, Response } from 'express';
import { login, logout, register } from '../../controllers/auth.controller';
import User from '../../models/user.model';
import { StandardResponse } from '../../utils/res.utils';
import { APP } from '../../config';
import bcryptUtils from '../../utils/crypto.utils';

jest.mock('../../models/user.model');
jest.mock('../../utils/crypto.utils');
describe('Auth Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockUser: Partial<User>;

  beforeEach(() => {
    mockRequest = {
      body: {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      },
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      cookie: jest.fn(),
    };
    mockUser = {
      id: '1',
      email: 'test@example.com',
      password: 'hashedPassword',
    };
  });

  afterEach(() => {});

  describe('Register', () => {
    it('should return a token when register is successful', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue(mockUser);

      await register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining(
          StandardResponse.success(
            {
              user: expect.any(Object),
              accessToken: expect.any(String),
            },
            'Operation successful',
            200,
          ),
        ),
      );

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        APP.JWT_COOKIE_NAME,
        expect.any(String),
        expect.objectContaining({
          httpOnly: true,
          secure: false, // assuming NODE_ENV is not 'production' in tests
          sameSite: 'lax',
        }),
      );
    });

    it('should return an error when missing required fields', async () => {
      mockRequest.body = {};

      await register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining(
          StandardResponse.error('Missing required fields', 'Operation failed', 400),
        ),
      );
    });

    it('should return an error when email is already in use', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      await register(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining(
          StandardResponse.error('This email is already in use.', 'Operation failed', 400),
        ),
      );
    });
  });

  describe('Login', () => {
    it('should return an error when missing required fields', async () => {
      mockRequest.body = {};

      await login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining(
          StandardResponse.error('Missing required fields', 'Operation failed', 400),
        ),
      );
    });

    it('should return an error when email is not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining(
          StandardResponse.error('Invalid email/password', 'Operation failed', 400),
        ),
      );
    });

    it('should return an error when password is incorrect', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcryptUtils.comparePassword as jest.Mock).mockResolvedValue(false);

      await login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining(
          StandardResponse.error('Invalid email/password', 'Operation failed', 400),
        ),
      );
    });

    it('should return an error when email is not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      await login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining(
          StandardResponse.error('Invalid email/password', 'Operation failed', 400),
        ),
      );
    });

    it('should return a token when login is successful', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcryptUtils.comparePassword as jest.Mock).mockResolvedValue(true);

      await login(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining(
          StandardResponse.success(
            {
              user: expect.any(Object),
              accessToken: expect.any(String),
            },
            'Operation successful',
            200,
          ),
        ),
      );
    });
  });

  describe('Logout', () => {
    it('should clear the refresh token cookie', async () => {
      logout(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining(
          StandardResponse.success(
            {
              message: 'Logout successful',
              status: 200,
            },
            'Operation successful',
            200,
          ),
        ),
      );

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        APP.JWT_COOKIE_NAME,
        '',
        expect.objectContaining({
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          expires: expect.any(Date),
        }),
      );
    });
  });
});
