import { expect } from 'chai';
import getPasswordHash from '../../domain/getPasswordHash';

/* eslint-disable no-undef */
describe('Function: getPasswordHash', () => {
  const password = 'foobar';

  it('should return a password hash', async () => {
    const hash = await getPasswordHash(password);
    expect(hash).to.be.a.string;
  });
});
