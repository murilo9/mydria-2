import { Request } from 'express';
import SignUpForm from './SignUpForm';

/**
 * Sign Up request before validation.
 */
interface SignUpRequest extends Request {
  body: SignUpForm,
  validatedSignUpForm?: SignUpForm
}

export default SignUpRequest;
