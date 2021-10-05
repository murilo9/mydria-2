import { ResponseLog } from '../../logging/types';
import SignUpRequest from '../types/SignUpRequest';

export default async function signUp(
  req: SignUpRequest,
  res: ResponseLog,
  next: Function,
  validateSignUpForm,
  insertUserOnDb,
  insertUserPasswordOnDb,
  sendVerificationEmail,
) {
  // Validate user form

  // Insert user on database

  // Send verification mail

  next(req, res);
}
