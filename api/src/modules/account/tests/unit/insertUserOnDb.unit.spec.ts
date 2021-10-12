import { expect } from 'chai';
import insertUserOnDb from '../../database/insertUserOnDb';
import UserGender from '../../types/UserGender';

/* eslint-disable no-undef */
describe('Function: insertUserOnDb', () => {
  before(() => {
    process.env.MONGODB_CONNECTION_PORT = '27020';
    process.env.MONGODB_DATABASE = 'mydria_db_test';
    process.env.MONGODB_USERNAME = 'mydria';
    process.env.MONGODB_PASSWORD = 'mydria_test';
  });

  xit('should insert the user on database', async () => {
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
