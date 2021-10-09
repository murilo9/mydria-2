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
  const createdUserMock = {
    _id: '',
  };
  const inserUserOnDbStub = () => ({
    failed: false,
    payload: createdUserMock,
  });

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
    insertUserOnDb = sinon.spy(inserUserOnDbStub);
    insertUserPasswordOnDb = sinon.spy();
  });

  it('should call insertUserOnDb properly', async () => {
    const expectedUserData = { ...userData };
    delete expectedUserData.password;
    await createUser(userData, insertUserOnDb, insertUserPasswordOnDb);
    expect(insertUserOnDb.calledOnceWith(sinon.match(expectedUserData))).to.be.true;
  });

  it('should call insertUserPasswordOnDb', async () => {
    await createUser(userData, insertUserOnDb, insertUserPasswordOnDb);
    expect(insertUserPasswordOnDb.calledOnce).to.be.true;
  });

  it('should not fail', async () => {
    const createUserResult = await createUser(userData, insertUserOnDb, insertUserPasswordOnDb);
    expect(createUserResult.failed).not.to.be.true;
  });

  it('should return the user properly', async () => {
    const createUserResult = await createUser(userData, insertUserOnDb, insertUserPasswordOnDb);
    expect(createUserResult.payload._id).to.exist;
  });

  it('should return a result with status 200', async () => {
    const createUserResult = await createUser(userData, insertUserOnDb, insertUserPasswordOnDb);
    expect(createUserResult.statusCode).to.be.equal(200);
  });
});
