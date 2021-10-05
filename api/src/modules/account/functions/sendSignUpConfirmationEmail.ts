import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import requestNotFailed from '../../utils/functions/requestNotFailed';
import MailjetMessage from '../../mailing/types/MailJetMessage';
import { Result } from '../../utils/types';

/**
 * Creates and sends the sign up verification email. Returns the account verification hash.
 * @param firstName User first name.
 * @param email User last name.
 * @param sendMail sendMail service function.
 * @returns The account verification hash.
 */
export default async function sendSignUpConfirmationEmail(
  firstName: string,
  email: string,
  sendMail: (message: MailjetMessage) => Promise<void>,
): Promise<Result<string>> {
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
    return {
      failed: false,
      payload: accountVerificationHash,
    };
  } catch (error) {
    return {
      failed: true,
      payload: 'There was an error while trying to send the verification mail',
      statusCode: 500,
    };
  }
}
