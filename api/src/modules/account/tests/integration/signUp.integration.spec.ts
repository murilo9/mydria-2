import { expect } from 'chai';
import { Response } from 'express';
import sinon, { fake, spy } from 'sinon';
import { Result } from '../../../utils/types';
import signUp from '../../controllers/signUp';
import SignUpForm from '../../types/SignUpForm';
import SignUpRequest from '../../types/SignUpRequest';
import User from '../../types/User';
import UserGender from '../../types/UserGender';
import UserInput from '../../types/UserInput';

/* eslint-disable no-undef */
describe('Controller: signUp', () => {
  let req: SignUpRequest;
  let res: Response;
  let status: sinon.SinonSpy;
  let write: sinon.SinonSpy;
  let validateSignUpForm: sinon.SinonSpy;
  let createUser: sinon.SinonSpy;
  let sendSignUpConfirmationEmail: sinon.SinonSpy;
  let sendMail: sinon.SinonSpy;

  context('Sign up request form is not valid', () => {
    beforeEach(() => {
      status = sinon.spy();
      write = sinon.spy();
      validateSignUpForm = sinon.spy();
      createUser = sinon.spy();
      sendSignUpConfirmationEmail = sinon.spy();
      sendMail = sinon.spy();
      req = {
        body: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          city: '',
          country: '',
          birthDate: new Date(),
          gender: UserGender.OTHER,
          uselessField: '',
          anotherUselessField: '',
        },
      } as unknown as SignUpRequest;
      res = {} as Response;
      res.status = status;
      res.write = write;
    });

    it('should call validateSignUpForm once', async () => {
      signUp(req, res, () => { }, validateSignUpForm, createUser, sendSignUpConfirmationEmail, sendMail);
      expect(validateSignUpForm.calledOnce).to.be.true;
    });

    it('should set response status to 400', async () => {
      signUp(req, res, () => { }, validateSignUpForm, createUser, sendSignUpConfirmationEmail, sendMail);
      expect(status.calledWith(400)).to.be.true;
    });

    it('should write to the response body', async () => {
      signUp(req, res, () => { }, validateSignUpForm, createUser, sendSignUpConfirmationEmail, sendMail);
      expect(write.calledOnce).to.be.true;
    });

    it('should not call createUser', async () => {
      signUp(req, res, () => { }, validateSignUpForm, createUser, sendSignUpConfirmationEmail, sendMail);
      expect(createUser.called).not.to.be.true;
    });

    it('should not call sendSignUpConfirmationEmail', async () => {
      signUp(req, res, () => { }, validateSignUpForm, createUser, sendSignUpConfirmationEmail, sendMail);
      expect(sendSignUpConfirmationEmail.called).not.to.be.true;
    });
  });

  context('Sign up request form is valid', async () => {
    beforeEach(() => {
      validateSignUpForm = sinon.spy();
      createUser = sinon.spy();
      sendSignUpConfirmationEmail = sinon.spy();
      sendMail = sinon.spy();
      req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@email.com',
          password: 'johnpass123',
          city: 'Nashville',
          country: 'USA',
          birthDate: new Date('06-08-1996'),
          gender: UserGender.MASCULINE,
          uselessField: '',
          anotherUselessField: '',
        },
      } as unknown as SignUpRequest;
      res = {} as Response;
      res.status = status;
    });

    it('should call validateSignUpForm once', async () => {
      signUp(req, res, () => { }, validateSignUpForm, createUser, sendSignUpConfirmationEmail, sendMail);
      expect(validateSignUpForm.calledOnceWith(req.body)).to.be.true;
    });

    it('should call createUser properly', async () => {
      const expectedUser = { ...req.body };
      delete expectedUser.uselessField;
      delete expectedUser.anotherUselessField;
      signUp(req, res, () => { }, validateSignUpForm, createUser, sendSignUpConfirmationEmail, sendMail);
      expect(createUser.calledWith(expectedUser)).to.be.true;
    });

    it('should call sendSignUpConfirmationEmail properly', async () => {
      const userFirstName = req.body.firstName;
      const userEmail = req.body.email;
      signUp(req, res, () => { }, validateSignUpForm, createUser, sendSignUpConfirmationEmail, sendMail);
      expect(sendSignUpConfirmationEmail.calledWith(userFirstName, userEmail, sendMail)).to.be.true;
    });

    it('should set response status to 200', async () => {
      signUp(req, res, () => { }, validateSignUpForm, createUser, sendSignUpConfirmationEmail, sendMail);
      expect(status.calledWith(200)).to.be.true;
    });

    it('should write a success response on the body', async () => {
      const expectedSuccessMessage = 'Account created successfully.';
      signUp(req, res, () => { }, validateSignUpForm, createUser, sendSignUpConfirmationEmail, sendMail);
      expect(write.calledOnceWith(expectedSuccessMessage)).to.be.true;
    });
  });
});
