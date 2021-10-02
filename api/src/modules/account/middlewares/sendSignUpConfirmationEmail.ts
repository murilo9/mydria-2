import { Response } from 'express';
import requestNotFailed from '../../utils/functions/requestNotFailed';
import { MailjetMessage, PostSignUpRequest } from '../types';

export default async function sendSignUpConfirmationEmail(
  req: PostSignUpRequest,
  res: Response,
  next: Function,
  sendMail: (message: MailjetMessage) => Promise<void>,
) {
  if (requestNotFailed(req)) {
    const { firstName, email } = req.validatedSignUpForm;
    const { accountVerificationCode } = req;
    const verificationLink = `https://mydria.app/api/verificate/${accountVerificationCode}?email=${email}`;
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
    } catch (error) {
      res.status(500);
      res.write('There was an error while trying to send the verification e-mail');
    }
  }
  next();
}
