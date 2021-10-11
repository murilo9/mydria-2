import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import MailjetMessage from '../../mailing/types/MailJetMessage';
import ValidatedSignUpRequest from '../types/ValidatedSignUpRequest';

/**
 * Creates and sends the sign up verification email. Returns the account verification hash.
 * @param firstName User first name.
 * @param email User last name.
 * @param sendMail sendMail service function.
 * @returns The account verification hash.
 */
export default async function sendSignUpConfirmationEmail(
  req: ValidatedSignUpRequest,
  res: Response,
  next: Function,
  sendMail: (message: MailjetMessage) => Promise<void>,
) {
  const { email, firstName } = req.validatedSignUpForm;
  const accountVerificationHash = uuid();
  const verificationLink = `https://mydria.app/api/verificate/${accountVerificationHash}?email=${email}`;
  const messageSubject = 'Confirm your sign up';
  const messageBody = `Welcome to Mydria, ${firstName}! To complete your sign up, click the link bellow.`;
  const messageHtml = `<a href="${verificationLink}">Verify</a>`;
  const message = {
    From: {
      Email: process.env.SYSTEM_EMAIL_ADDRESS,
      Name: 'Mydria Social',
    },
    To: [{
      Email: email,
      Name: firstName,
    }],
    Subject: messageSubject,
    TextPart: messageBody,
    HTMLPart: messageHtml,
  };
  try {
    await sendMail(message);
    res.end();
  } catch (error) {
    res.status(500);
    res.send('There was an error while trying to send the verification mail');
  }
}
