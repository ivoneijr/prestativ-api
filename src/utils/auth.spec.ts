import { describe, it, expect } from 'vitest';

import bcrypt from 'bcrypt';
import { generateHash } from './auth';

describe('generateHash', () => {
  it('generates a hash of the input string', async () => {
    const data = 'password';
    const hash = await generateHash(data);

    const isMatch = await bcrypt.compare(data, hash);
    expect(isMatch).toBe(true);
  });
});
