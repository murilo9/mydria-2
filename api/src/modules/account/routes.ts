import { Application } from 'express';
import makeRoute from '../system/helpers/makeRoute';
import verifyJWT from '../system/helpers/verifyJWT';
import SignInController from './controllers/SignIn';
import SignUpController from './controllers/SignUp';
import UpdateUserDataController from './controllers/UpdateUserInfo';
import validateSignInForm from './validators/validateSignInForm';
import validateSignUpForm from './validators/validateSignUpForm';
import validateUserInfoForm from './validators/validateUserInfoForm';

export default function accountRoutes(app: Application) {
  app.post('/signup', makeRoute(new SignUpController(validateSignUpForm)));
  app.post('/signin', makeRoute(new SignInController(validateSignInForm)));
  app.put('/user/me', verifyJWT, makeRoute(new UpdateUserDataController(validateUserInfoForm)));
}
