import { Request } from 'express';

/**
 * Users' valid genders.
 */
export enum UserGender {
  MASCULINE = 'MASCULINE',
  FEMININE = 'FEMININE',
  OTHER = 'OTHER' // Uses they/their
}

/**
 * User sign up form fields.
 */
export type SignUpForm = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  city?: string,
  country?: string,
  birthDate: Date,
  gender: UserGender
}

/**
 * Sign Up request before validation.
 */
export interface SignUpRequest extends Request {
  body: SignUpForm,
  validatedSignUpForm?: SignUpForm
}

/**
 * Sign Up request after validation.
 */
export interface ValidatedSignUpRequest extends SignUpRequest {
  validatedSignUpForm: SignUpForm
}

/**
 * Sign Up request after email verification was sent.
 */
export interface PostSignUpRequest extends ValidatedSignUpRequest {
  accountVerificationCode: string
}

/**
 * MailJet service message object.
 */
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
