import UserGender from './UserGender';

/**
 * User sign up form fields.
 */
type SignUpForm = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  city?: string,
  country?: string,
  birthDate: Date,
  gender: UserGender
}

export default SignUpForm;
