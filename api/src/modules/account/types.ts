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
  validatedSignUpForm: SignUpForm
}

export interface PostSignUpRequest extends ValidatedSignUpRequest {
  accountVerificationCode: string
}

export type MailjetMessage = {
  From: {
    Email: string,
    Name: string,
  },
  To: Array<{
    Email: string,
    Name: string,
  }>,
  Subject: string,
  TextPart: string,
  HTMLPart: string
}
