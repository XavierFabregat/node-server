import bcrypt from 'bcrypt';
import { comparePassword, hashPassword } from '../../utils/crypto.utils';

jest.mock('bcrypt');

describe('Crypto Utils', () => {
  const mockPassword = 'password123';

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const mockSalt = 'mockSalt';
      const mockHash = 'mockHash';

      (bcrypt.genSalt as jest.Mock).mockResolvedValue(mockSalt);
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHash);

      const hashedPassword = await hashPassword(mockPassword);

      expect(hashedPassword).toBe(mockHash);
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, mockSalt);
    });
  });

  describe('comparePassword', () => {
    it('should return true when comparing a password with a matching hash', async () => {
      const mockHash = 'mockHash';

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await comparePassword(mockPassword, mockHash);

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockHash);
    });

    it('should return false when comparing a password with a non-matching hash', async () => {
      const mockHash = 'mockHash';

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await comparePassword(mockPassword, mockHash);

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockPassword, mockHash);
    });
  });
});
