import { expect } from 'chai';
import insertUserOnDb from '../../database/insertUserOnDb';
import UserGender from '../../types/UserGender';

/* eslint-disable no-undef */
describe('Function: insertUserOnDb', () => {
  it('should insert the user on database', async () => {
    const userData = {
      firstName: 'Billy',
      lastName: 'Idol',
      email: 'billy.idol@email.com',
      city: 'Stanmore',
      country: 'United Kingdom',
      birthDate: new Date('06-08-1996'),
      gender: UserGender.MASCULINE,
    };
    const insertionResult = await insertUserOnDb(userData);
    expect(insertionResult.failed).not.to.be.true;
  });
});
