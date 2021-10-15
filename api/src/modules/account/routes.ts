import { Application } from 'express';
import makeRoute from '../system/helpers/makeRoute';
import SignUpController from './controllers/SignUp';
import validateSignUpForm from './validators/validateSignUpForm';

export default function accountRoutes(app: Application) {
  app.post('/signup', makeRoute(new SignUpController(validateSignUpForm)));
}
