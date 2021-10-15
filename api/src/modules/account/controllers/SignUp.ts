import Controller from '../../system/types/Controller';
import IAssertiveController from '../../system/types/IAssertiveController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import inserUserOnDatabase from '../DAL/insertUserOnDatabase';
import inserUserPasswordOnDatabase from '../DAL/insertUserPasswordOnDb';
import getPasswordHash from '../domain/getPasswordHash';
import { SignUpRequest } from '../types/SignUpRequest';

export default class SignUpController extends Controller implements IAssertiveController {
  validator: ResultAsyncFunction;

  constructor(validator: ResultAsyncFunction) {
    super();
    this.validator = validator;
  }

  async handle(request: SignUpRequest): Promise<Result<any>> {
    // Validate form
    const signUpForm = { ...request.body };
    // Insert user on database
    const createUserResult = await inserUserOnDatabase(signUpForm);
    if (createUserResult.failed) {
      return createUserResult;
    }
    // Insert user password on database
    const passwordHash = await getPasswordHash(signUpForm.password);
    const createPasswordResult = await inserUserPasswordOnDatabase(passwordHash, createUserResult.payload._id);
    if (createPasswordResult.failed) {
      return createPasswordResult;
    }
    return {
      failed: false,
      payload: 'Account created successfully',
      statusCode: createUserResult.statusCode,
    };
    // Send verification email
  }
}
