import { equal } from 'assert';
import { Response } from 'express';
import clearString from '../functions/clearString';
import validateNotNull from '../functions/validateNotNull';
import validateUserBirthDate from '../functions/validateUserBirthDate';
import validateUserEmail from '../functions/validateUserEmail';
import validateUserGender from '../functions/validateUserGender';
import validateUserName from '../functions/validateUserName';
import { SignUpRequest } from '../types';

export default function validateSignUpRequest(req: SignUpRequest, res: Response, next: Function) {
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
    signUpFormFields.forEach((formKey) => validateNotNull(req.body[formKey]));
    validateUserBirthDate(req.body.birthDate);
    validateUserName(req.body.firstName, req.body.lastName);
    validateUserEmail(req.body.email);
    validateUserGender(req.body.gender);
    // Builds the validated sign up form with the fields
    req.validatedSignUpForm = {
      firstName: clearString(req.body.firstName),
      lastName: clearString(req.body.lastName),
      email: clearString(req.body.email),
      password: req.body.password,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      city: clearString(req.body.city),
      country: clearString(req.body.country),
    };
  } catch (error) {
    res.write(error);
    res.status(400);
  }
  next(req, res);
}
