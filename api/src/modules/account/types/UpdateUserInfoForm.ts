import UserGender from './UserGender';

/**
 * User info update form fields.
 */
type UpdateUserInfoForm = {
  firstName: string,
  lastName: string,
  password: string,
  city: string,
  country: string,
  birthDate: Date,
  gender: UserGender,
}

export default UpdateUserInfoForm;
