import { expect } from 'chai';
import { Response } from 'express';
import sinon from 'sinon';
import sendSignUpConfirmationEmail from '../../middlewares/sendSignUpConfirmationEmail';
import { PostSignUpRequest } from '../../types';

/* eslint-disable no-undef */
describe('Middleware: sendSignUpConfirmationEmail', () => {
  it('should call sendMail once', async () => {
    // Sets the request to be sent
    const req = {
      validatedSignUpForm: {
        firstName: 'Murilo',
        email: 'murilohenriquematias@gmail.com',
      },
      accountVerificationCode: 'xxxxx-xxxxxxx-xxxx-xxxxxx',
    } as unknown as PostSignUpRequest;
    // Response must have a write method
    const res = {
      write() { },
    } as unknown as Response;
    // Set a stub for sendMail
    const sendMail = sinon.fake();
    // Test
    await sendSignUpConfirmationEmail(req, res, () => { }, sendMail);
    // Assert
    expect(sendMail.calledOnce).to.be.true;
  });
});
