import { Application } from 'express';
import sendMail from '../mailing/functions/sendMail';
import inject from '../utils/functions/inject';
import createUser from './controllers/createUser';
import sendSignUpConfirmationEmail from './controllers/sendSignUpConfirmationEmail';
import validateSignUpForm from './controllers/validateSignUpForm';
import insertUserOnDb from './database/insertUserOnDb';
import insertUserPasswordOnDb from './database/insertUserPasswordOnDb';

export default function routes(app: Application) {
  app.post(
    '/signup',
    validateSignUpForm,
    inject(createUser, insertUserOnDb, insertUserPasswordOnDb),
    inject(sendSignUpConfirmationEmail, sendMail),
  );
}
