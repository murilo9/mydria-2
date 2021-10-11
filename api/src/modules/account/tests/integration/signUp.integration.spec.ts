import { expect } from 'chai';
import sinon from 'sinon';
import { Result } from '../../../utils/types';
import createUser from '../../controllers/createUser';
import sendSignUpConfirmationEmail from '../../controllers/sendSignUpConfirmationEmail';
import validateSignUpForm from '../../controllers/validateSignUpForm';
import UserGender from '../../types/UserGender';

/* eslint-disable no-undef */
describe('Sign up', () => {
  let req;
  let res;
  let send: sinon.SinonSpy;
  let end: sinon.SinonSpy;
  let write: sinon.SinonSpy;
  let status: sinon.SinonSpy;
  let insertUserOnDb: sinon.SinonSpy;
  let insertUserPasswordOnDb: sinon.SinonSpy;
  let sendMail: sinon.SinonSpy;
  const next = () => { };
  const signUpForm = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@email.com',
    password: 'janepass123',
    city: 'Machester',
    country: 'United Kingdom',
    birthDate: new Date('06-08-1996'),
    gender: UserGender.FEMININE,
  };

  beforeEach(() => {
    send = sinon.spy();
    end = sinon.spy();
    write = sinon.spy();
    status = sinon.spy();
    insertUserOnDb = sinon.spy((arg: any): Result<any> => ({ failed: false, payload: arg, statusCode: 200 }));
    insertUserPasswordOnDb = sinon.spy();
    sendMail = sinon.spy();
    req = {
      body: { ...signUpForm },
    };
    res = {
      send,
      end,
      write,
      status,
    };
  });

  it('should end the request with status 200', async () => {
    validateSignUpForm(req, res, next);
    await createUser(req, res, next, insertUserOnDb, insertUserPasswordOnDb);
    await sendSignUpConfirmationEmail(req, res, next, sendMail);
    expect(status.calledOnceWith(200)).to.be.true;
  });

  it('should end the request with user data on body', async () => {
    const expectedUserData = { ...signUpForm };
    delete expectedUserData.password;
    validateSignUpForm(req, res, next);
    await createUser(req, res, next, insertUserOnDb, insertUserPasswordOnDb);
    await sendSignUpConfirmationEmail(req, res, next, sendMail);
    expect(write.calledOnceWith(sinon.match(expectedUserData))).to.be.true;
  });
});
