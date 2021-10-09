import { Response } from 'express';
import MailjetMessage from '../../mailing/types/MailJetMessage';
import { Result } from '../../utils/types';
import SignUpForm from '../types/SignUpForm';
import SignUpRequest from '../types/SignUpRequest';
import User from '../types/User';
import UserInput from '../types/UserInput';

export default async function signUp(
  req: SignUpRequest,
  res: Response,
  next: Function,
  validateSignUpForm: (signUpForm: SignUpForm) => Result<string | SignUpForm>,
  createUser: (user: UserInput, insertUserOnDb, insertUserPasswordOnDb) => Result<User>,
  sendSignUpConfirmationEmail: (firstName: string, email: string, sendMail: (message: MailjetMessage) => Promise<void>) => Promise<Result<string>>,
  sendMail: (message: MailjetMessage) => Promise<void>,
) {
  // Validate user form
  const userFormValidation = validateSignUpForm(req.body);

  // If user form is not valid
  if (userFormValidation.failed) {
    res.status(400);
    res.write(userFormValidation.payload);
  } else {
    // Insert user on database

    // Send verification mail

    res.status(200);
    res.write('Account successfully created.');
  }
  next(req, res);
}
