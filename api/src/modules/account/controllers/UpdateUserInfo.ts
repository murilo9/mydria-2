import Controller from '../../system/types/Controller';
import IAssertiveController from '../../system/types/IAssertiveController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import updateUserInfoOnDatabase from '../db/updateUserOnDatabase';
import UpdateUserInfoForm from '../types/UpdateUserInfoForm';
import UpdateUserInfoRequest from '../types/UpdateUserInfoRequest';

export default class UpdateUserDataController extends Controller implements IAssertiveController {
  validator: ResultAsyncFunction;

  constructor(validator: ResultAsyncFunction) {
    super();
    this.validator = validator;
  }

  async handle(request: UpdateUserInfoRequest): Promise<Result<UpdateUserInfoForm>> {
    // TODO collect formated form data from request body
    const updateUserInfoForm = { ...request.body };
    const userId = request.headers['user-id'] as string;
    // Update user on database
    const updateUserInfoResult = await updateUserInfoOnDatabase(updateUserInfoForm, userId);
    return updateUserInfoResult;
  }
}
