import { Request } from 'express';

export enum UserGender {
  MASCULINE = 'MASCULINE',
  FEMININE = 'FEMININE',
  OTHER = 'OTHER'
}

export type SignUpForm = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  city: string,
  country: string,
  birthDate: Date,
  gender: UserGender
}

export interface SignUpRequest extends Request {
  body: SignUpForm
}

export interface ValidatedSignUpRequest extends SignUpRequest {
  signUpForm: SignUpForm
}
