import dotenv from 'dotenv';

import web3 from '~/common/services/web3';
import { hashSecret, compareHashSecret } from '~/server/services/crypto';

describe('Crypto service', () => {
  let str;

  beforeAll(() => {
    // We have to manually import the .env variables for this test
    dotenv.config();
  });

  beforeEach(() => {
    str = 'juppi puppi 2000';
  });

  describe('hashSecret', () => {
    it('should deterministcally generate a hash', () => {
      const hash = hashSecret(str);

      expect(hash).toBe(hashSecret(str));
      expect(web3.utils.isHexStrict(hash)).toBeTruthy();
    });
  });

  describe('compareHashSecret', () => {
    it('should correctly indicate if the hash input is correct', () => {
      const hash = hashSecret(str);
      const wrongHash = hashSecret(str + 'ha');

      expect(compareHashSecret(str, hash)).toBeTruthy();
      expect(compareHashSecret(str, wrongHash)).toBeFalsy();
      expect(compareHashSecret(str + 'ha', hash)).toBeFalsy();
    });
  });
});
