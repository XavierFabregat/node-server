import User from '../../models/user.model';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { APP } from '../../config';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '../../utils/auth.utils';

jest.mock('jsonwebtoken');
jest.mock('express');

describe('Auth Utils', () => {
  let mockUser: Partial<User>;

  beforeEach(() => {
    mockUser = {
      id: '123',
      tokenVersion: 0,
    };
  });
  // const mockUser = {
  //   id: 1,
  //   tokenVersion: 0,
  // };

  // const mockResponse = {
  //   cookie: jest.fn(),
  // } as unknown as Response;

  describe('createAccessToken', () => {
    it('should create an access token', () => {
      const mockToken = 'mockToken';
      (sign as jest.Mock).mockReturnValue(mockToken);

      const token = createAccessToken(mockUser as User);

      expect(sign as jest.Mock).toHaveBeenCalledWith(
        { userId: mockUser.id },
        APP.ACCESS_TOKEN_SECRET,
        {
          expiresIn: APP.ACCESS_TOKEN_LIFETIME,
        }
      );
      expect(token).toBe(mockToken);
    });
  });

  describe('createRefreshToken', () => {
    it('should create a refresh token', () => {
      const mockToken = 'mockToken';
      (sign as jest.Mock).mockReturnValue(mockToken);

      const token = createRefreshToken(mockUser as User);

      expect(sign as jest.Mock).toHaveBeenCalledWith(
        { userId: mockUser.id, tokenVersion: mockUser.tokenVersion },
        APP.REFRESH_TOKEN_SECRET,
        { expiresIn: APP.REFRESH_TOKEN_LIFETIME }
      );
      expect(token).toBe(mockToken);
    });
  });

  describe('sendRefreshToken', () => {
    it('should send a refresh token', () => {
      const mockResponse = {
        cookie: jest.fn(),
      } as unknown as Response;

      sendRefreshToken(mockResponse, 'mockToken');

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        APP.JWT_COOKIE_NAME,
        'mockToken',
        {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7 * 1000,
        }
      );
    });
  });
});
