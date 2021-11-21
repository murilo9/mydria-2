import { Application } from 'express';
import makeRoute from '../system/helpers/makeRoute';
import userOwnsUser from './authorizators/userOwnsUser';
import SignUpController from './controllers/SignUp';
import UpdateUserDataController from './controllers/UpdateUserInfo';
import validateSignUpForm from './validators/validateSignUpForm';
import validateUserInfoForm from './validators/validateUserInfoForm';

export default function accountRoutes(app: Application) {
  app.post('/signup', makeRoute(new SignUpController(validateSignUpForm)));
  app.put('/user/:userId', makeRoute(new UpdateUserDataController(validateUserInfoForm, userOwnsUser)));
}
