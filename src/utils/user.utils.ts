import User from '../models/user.model';

export function sanitizeOutput(user: User, isOwnAccount = false) {
  const { password, tokenVersion, ...sanitizedUser } = user;
  if (isOwnAccount) {
    return sanitizedUser;
  }
  const { email, ...publicUser } = sanitizedUser;
  return publicUser;
}
