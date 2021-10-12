/* eslint-disable no-undef */
import bcrypt from 'bcrypt';
import { expect } from 'chai';
import { v4 as uuid } from 'uuid';
import insertUserPasswordOnDb from '../../database/insertUserPasswordOnDb';

describe('Function: insertUserPasswordOnDb', () => {
  const password = 'password';
  let passwordHash: string;
  let userId: string;

  beforeEach(async () => {
    passwordHash = await bcrypt.hash(password, 10);
    userId = uuid();
  });

  it('should not fail', async () => {
    const insertPasswordResult = await insertUserPasswordOnDb(passwordHash, userId);
    expect(insertPasswordResult.failed).not.to.be.true;
  });
});
