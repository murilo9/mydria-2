import SignUpForm from './SignUpForm';
import SignUpRequest from './SignUpRequest';

/**
 * Sign Up request before validation.
 */
interface ValidatedSignUpRequest extends SignUpRequest {
  validatedSignUpForm: SignUpForm
}

export default ValidatedSignUpRequest;
