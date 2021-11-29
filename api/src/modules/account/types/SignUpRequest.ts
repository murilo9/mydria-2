import { Request } from 'express';
import SignUpForm from './SignUpForm';

export interface SignUpRequest extends Request {
  body: SignUpForm
}
