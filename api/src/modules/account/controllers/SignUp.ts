import Controller from '../../system/types/Controller';
import IAssertiveController from '../../system/types/IAssertiveController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import insertUserOnDatabase from '../db/insertUserOnDatabase';
import insertUserPasswordOnDatabase from '../db/insertUserPasswordOnDb';
import getPasswordHash from '../domain/getPasswordHash';
import { SignUpRequest } from '../types/SignUpRequest';

export default class SignUpController extends Controller implements IAssertiveController {
  validator: ResultAsyncFunction;

  constructor(validator: ResultAsyncFunction) {
    super();
    this.validator = validator;
  }

  async handle(request: SignUpRequest): Promise<Result<any>> {
    // TODO: collect formatted form data from request body
    const signUpForm = { ...request.body };
    const { password } = signUpForm;
    delete signUpForm.password;
    // Insert user on database
    const createUserResult = await insertUserOnDatabase(signUpForm);
    if (createUserResult.failed) {
      return createUserResult;
    }
    // Insert user password on database
    const passwordHash = await getPasswordHash(password);
    const createPasswordResult = await insertUserPasswordOnDatabase(passwordHash, createUserResult.payload._id);
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
