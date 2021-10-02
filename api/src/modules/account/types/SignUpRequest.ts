import { Request } from 'express';
import SignUpForm from './SignUpForm';

/**
 * Sign Up request before validation.
 */
export default interface SignUpRequest extends Request {
  body: SignUpForm,
}
