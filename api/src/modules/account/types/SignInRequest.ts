import { Request } from 'express';
import SignInForm from './SignInForm';

export interface SignInRequest extends Request {
  body: SignInForm
}
