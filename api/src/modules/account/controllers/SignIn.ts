import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Controller from '../../system/types/Controller';
import IAssertiveController from '../../system/types/IAssertiveController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import getUserFromDatabaseByEmail from '../db/getUserFromDatabaseByEmail';
import { SignInRequest } from '../types/SignInRequest';

export default class SignInController extends Controller implements IAssertiveController {
  validator: ResultAsyncFunction;

  constructor(validator: ResultAsyncFunction) {
    super();
    this.validator = validator;
  }

  async handle(request: SignInRequest): Promise<Result<any>> {
    const { email } = request.body;
    const getUser = await getUserFromDatabaseByEmail(email);
    if (getUser.failed) {
      return getUser;
    }
    const user = getUser.payload;
    const userId = user._id;
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: 10800, // expires in 3 hours
    });
    return {
      failed: false,
      payload: token,
      statusCode: 200,
    }
  }
}
