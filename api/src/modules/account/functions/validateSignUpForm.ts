import clearString from '../../utils/functions/clearString';
import validateNotNull from '../validators/validateNotNull';
import validateUserBirthDate from '../validators/validateUserBirthDate';
import validateUserEmail from '../validators/validateUserEmail';
import validateUserGender from '../validators/validateUserGender';
import validateUserName from '../validators/validateUserName';
import SignUpForm from '../types/SignUpForm';
import { Result } from '../../utils/types';

export default function validateSignUpForm(signUpForm: SignUpForm): Result<string | SignUpForm> {
  try {
    const signUpFormFields = [
      'firstName',
      'lastName',
      'email',
      'password',
      'birthDate',
      'gender',
      'city',
      'country',
    ];
    signUpFormFields.forEach((formKey) => validateNotNull(signUpForm[formKey]));
    validateUserBirthDate(signUpForm.birthDate);
    validateUserName(signUpForm.firstName, signUpForm.lastName);
    validateUserEmail(signUpForm.email);
    validateUserGender(signUpForm.gender);
    // Builds the validated sign up form with the fields
    const validatedSignUpForm = {
      firstName: clearString(signUpForm.firstName),
      lastName: clearString(signUpForm.lastName),
      email: clearString(signUpForm.email),
      password: signUpForm.password,
      birthDate: signUpForm.birthDate,
      gender: signUpForm.gender,
      city: clearString(signUpForm.city),
      country: clearString(signUpForm.country),
    };
    return {
      payload: validatedSignUpForm,
      failed: false,
    };
  } catch (error) {
    return {
      failed: true,
      statusCode: 400,
      payload: error,
    };
  }
}
