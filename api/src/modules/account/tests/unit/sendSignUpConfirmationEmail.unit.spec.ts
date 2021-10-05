import { expect } from 'chai';
import { Response } from 'express';
import sinon from 'sinon';
import sendSignUpConfirmationEmail from '../../functions/sendSignUpConfirmationEmail';

/* eslint-disable no-undef */
describe('Function: sendSignUpConfirmationEmail', () => {
  it('should call sendMail once', async () => {
    const firstName = 'Murilo';
    const lastName = 'murilohenriquematias@gmail.com';
    const sendMail = sinon.fake();
    await sendSignUpConfirmationEmail(firstName, lastName, sendMail);
    expect(sendMail.calledOnce).to.be.true;
  });
});
