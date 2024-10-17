import User from '../models/user.model';

export function sanitizeOutput(user: User, isOwnAccount = false) {
  const { password: _password, tokenVersion: _tokenVersion, ...sanitizedUser } = user;
  if (isOwnAccount) {
    return sanitizedUser;
  }
  const { email: _email, ...publicUser } = sanitizedUser;
  return publicUser;
}
