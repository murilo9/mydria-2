import { expect } from 'chai';
import { Response } from 'express';
import sinon from 'sinon';
import validateSignUpRequest from '../../middlewares/validateSignUpRequest';
import {
  SignUpForm, SignUpRequest, UserGender,
} from '../../types';

/* eslint-disable no-undef */
describe('Middleware: validateSignUpForm', () => {
  let validSignUpForm: SignUpForm;
  let invalidSignUpForm: SignUpForm;
  let next = sinon.fake();
  let write = sinon.fake();
  let status = sinon.fake();
  let req: SignUpRequest;
  let res: Response;

  context('Passing a valid sign up form', () => {
    beforeEach(() => {
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
      next = sinon.fake();
      write = sinon.fake();
      status = sinon.fake();
      req = {
        body: validSignUpForm,
      } as unknown as SignUpRequest;
      res = {
        status,
        write,
      } as unknown as Response;
    });

    it('should not set status code', () => {
      validateSignUpRequest(req, res, next);
      expect(status.called).not.to.be.true;
    });

    it('should set the validated sign up form on the request', () => {
      validateSignUpRequest(req, res, next);
      // TODO: better attributes testing
      expect(req.validatedSignUpForm).to.exist;
    });
  });

  context('Passing an invalid sign up form', () => {
    beforeEach(() => {
      invalidSignUpForm = {
        firstName: 'A',
        lastName: 'B',
        email: 'a.b@',
        password: 'abc',
        birthDate: new Date(),
        gender: null,
      };
      next = sinon.fake();
      write = sinon.fake();
      status = sinon.fake();
      req = {
        body: invalidSignUpForm,
      } as unknown as SignUpRequest;
      res = {
        status,
        write,
      } as unknown as Response;
    });

    it('should set status code to 400', () => {
      validateSignUpRequest(req, res, next);
      expect(status.calledWith(400)).to.be.true;
    });

    it('should put some message on response body', () => {
      validateSignUpRequest(req, res, next);
      expect(write.calledOnce).to.be.true;
    });
  });
});
