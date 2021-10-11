import { expect } from 'chai';
import { Response } from 'express';
import sinon from 'sinon';
import validateSignUpForm from '../../controllers/validateSignUpForm';
import SignUpForm from '../../types/SignUpForm';
import SignUpRequest from '../../types/SignUpRequest';
import UserGender from '../../types/UserGender';

/* eslint-disable no-undef */
describe('Controller: validateSignUpForm', () => {
  let validSignUpForm: SignUpForm;
  let invalidSignUpForm: SignUpForm;
  let next: sinon.SinonSpy;
  let status: sinon.SinonSpy;
  let send: sinon.SinonSpy;
  let req: SignUpRequest;
  let res;

  context('Passing a valid sign up form', () => {
    beforeEach(() => {
      // Functon spies
      next = sinon.spy();
      status = sinon.spy();
      send = sinon.spy();
      // Valid sign up form
      validSignUpForm = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        password: 'johnpass123',
        city: 'Winnipeg',
        country: 'Canada',
        birthDate: new Date('01-01-1990'),
        gender: UserGender.MASCULINE,
      };
      // Request object
      req = {
        body: validSignUpForm,
      } as SignUpRequest;
      // Response object
      res = {
        status,
        send,
      };
    });

    it('should not set status code', () => {
      validateSignUpForm(req, res, next);
      expect(status.called).not.to.be.true;
    });

    it('should call next', () => {
      validateSignUpForm(req, res, next);
      expect(next.called).to.be.true;
    });

    it('should set the validated sign up form on the request', () => {
      validateSignUpForm(req, res, next);
      expect(req.validatedSignUpForm).to.exist;
      // TODO: better testing on validatedSignUpForm attributes
    });
  });

  context('Passing an invalid sign up form', () => {
    beforeEach(() => {
      next = sinon.spy();
      status = sinon.spy();
      send = sinon.spy();
      invalidSignUpForm = {
        firstName: 'A',
        lastName: 'B',
        email: 'a.b@',
        password: 'abc',
        birthDate: new Date(),
        gender: null,
      };
      req = {
        body: invalidSignUpForm,
      } as SignUpRequest;
      res = {
        status,
        send,
      };
    });

    it('should set status code to 400', () => {
      validateSignUpForm(req, res, next);
      expect(status.calledOnceWith(400)).to.be.true;
    });

    it('should not call next', () => {
      validateSignUpForm(req, res, next);
      expect(next.called).not.to.be.true;
    });

    it('should finish the request', () => {
      validateSignUpForm(req, res, next);
      expect(send.calledOnce).to.be.true;
    });
  });
});
