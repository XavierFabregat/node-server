import User from '../../models/user.model';
import { sanitizeOutput } from '../../utils/user.utils';

describe('sanitizeOutput', () => {
  it('should return only the public user details if not own account', () => {
    const user = {
      id: '1234',
      email: 'test@example.com',
      password: 'hashedPassword',
      tokenVersion: 1,
      firstName: 'John',
      lastName: 'Doe',
    } as Partial<User>;

    const sanitized = sanitizeOutput(user as User);

    expect(sanitized).toEqual({
      id: '1234',
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(sanitized).not.toHaveProperty('password');
    expect(sanitized).not.toHaveProperty('tokenVersion');
    expect(sanitized).not.toHaveProperty('email');
  });

  it('should return all user minus password and tokenVersion details if own account', () => {
    const user = {
      id: '1234',
      email: 'test@example.com',
      password: 'hashedPassword',
      tokenVersion: 1,
      firstName: 'John',
      lastName: 'Doe',
    } as Partial<User>;

    const sanitized = sanitizeOutput(user as User, true);

    expect(sanitized).toEqual({
      id: '1234',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(sanitized).not.toHaveProperty('password');
    expect(sanitized).not.toHaveProperty('tokenVersion');
  });
});
