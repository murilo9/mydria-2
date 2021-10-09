import { expect } from 'chai';
import sinon from 'sinon';
import createUser from '../../functions/createUser';
import UserGender from '../../types/UserGender';
import UserInput from '../../types/UserInput';

/* eslint-disable no-undef */
describe('Function: createUser', () => {
  let userData: UserInput;
  let insertUserOnDb: sinon.SinonSpy;
  let insertUserPasswordOnDb: sinon.SinonSpy;

  beforeEach(() => {
    userData = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@email.com',
      password: 'janepass123',
      city: 'Machester',
      country: 'United Kingdom',
      birthDate: new Date('06-08-1996'),
      gender: UserGender.FEMININE,
    };
    insertUserOnDb = sinon.spy();
    insertUserPasswordOnDb = sinon.spy();
  });

  it('should call insertUserOnDb properly', async () => {
    const expectedUserData = { ...userData };
    delete expectedUserData.password;
    await createUser(userData, insertUserOnDb, insertUserPasswordOnDb);
    expect(insertUserOnDb.calledOnceWith(expectedUserData)).to.be.true;
  });

  it('should call insertUserPasswordOnDb properly', async () => {
    const userPassword = userData.password;
    const userId = undefined;
    await createUser(userData, insertUserOnDb, insertUserPasswordOnDb);
    expect(insertUserPasswordOnDb.calledOnceWith(userPassword, userId)).to.be.true;
  });

  it('should return the user properly', async () => {
    const createdUser = await createUser(userData, insertUserOnDb, insertUserPasswordOnDb);
    // TODO
  });
});
