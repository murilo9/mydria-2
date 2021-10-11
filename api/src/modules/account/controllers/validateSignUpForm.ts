import { Response } from 'express';
import clearString from '../../utils/functions/clearString';
import validateNotNull from '../validators/validateNotNull';
import validateUserBirthDate from '../validators/validateUserBirthDate';
import validateUserEmail from '../validators/validateUserEmail';
import validateUserGender from '../validators/validateUserGender';
import validateUserName from '../validators/validateUserName';
import SignUpRequest from '../types/SignUpRequest';

export default function validateSignUpForm(req: SignUpRequest, res: Response, next: Function) {
  const signUpForm = { ...req.body };
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
    req.validatedSignUpForm = validatedSignUpForm;
    next();
  } catch (error) {
    res.status(400);
    res.send(error);
  }
}
