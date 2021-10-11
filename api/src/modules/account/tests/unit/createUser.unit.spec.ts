import { expect } from 'chai';
import sinon from 'sinon';
import createUserController from '../../controllers/createUser';
import UserGender from '../../types/UserGender';
import UserInput from '../../types/UserInput';
import ValidatedSignUpRequest from '../../types/ValidatedSignUpRequest';

/* eslint-disable no-undef */
describe('Controller: createUser', () => {
  let req: ValidatedSignUpRequest;
  let res;
  let write: sinon.SinonSpy;
  let status: sinon.SinonSpy;
  let next: sinon.SinonSpy;
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
    req = {
      validatedSignUpForm: userData,
    } as ValidatedSignUpRequest;
    status = sinon.spy();
    write = sinon.spy();
    next = sinon.spy();
    res = {
      status,
      write,
    };
    insertUserOnDb = sinon.spy((arg) => ({ failed: false, payload: arg }));
    insertUserPasswordOnDb = sinon.spy();
  });

  it('should call insertUserOnDb properly', async () => {
    const expectedUserData = { ...userData };
    delete expectedUserData.password;
    await createUserController(req, res, next, insertUserOnDb, insertUserPasswordOnDb);
    expect(insertUserOnDb.calledOnceWith(sinon.match(expectedUserData))).to.be.true;
  });

  it('should call insertUserPasswordOnDb', async () => {
    await createUserController(req, res, next, insertUserOnDb, insertUserPasswordOnDb);
    expect(insertUserPasswordOnDb.calledOnce).to.be.true;
  });

  it('should write the user data to response', async () => {
    const expectedUserData = { ...userData };
    delete expectedUserData.password;
    await createUserController(req, res, next, insertUserOnDb, insertUserPasswordOnDb);
    expect(write.calledOnceWith(sinon.match(expectedUserData))).to.be.true;
  });

  it('should set response status to 200', async () => {
    await createUserController(req, res, next, insertUserOnDb, insertUserPasswordOnDb);
    expect(status.calledOnceWith(200));
  });
});
