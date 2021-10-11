import { expect } from 'chai';
import sinon from 'sinon';
import sendSignUpConfirmationEmail from '../../controllers/sendSignUpConfirmationEmail';
import ValidatedSignUpRequest from '../../types/ValidatedSignUpRequest';

/* eslint-disable no-undef */
describe('Controller: sendSignUpConfirmationEmail', () => {
  let req: ValidatedSignUpRequest;
  let res;
  let status: sinon.SinonSpy;
  let send: sinon.SinonSpy;
  let end: sinon.SinonSpy;
  const next = () => { };

  beforeEach(() => {
    status = sinon.spy();
    send = sinon.spy();
    end = sinon.spy();
    const validatedSignUpForm = {
      email: 'john.doe@email.com',
      firstName: 'John',
    };
    req = {
      validatedSignUpForm,
    } as ValidatedSignUpRequest;
    res = {
      status,
      send,
      end,
    };
  });

  it('should call sendMail once', async () => {
    const sendMail = sinon.fake();
    await sendSignUpConfirmationEmail(req, res, next, sendMail);
    expect(sendMail.calledOnce).to.be.true;
  });
});
