import Controller from '../../system/types/Controller';
import IAssertiveController from '../../system/types/IAssertiveController';
import IRestrictAccessController from '../../system/types/IRestricAccessController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import updateUserInfoOnDatabase from '../db/updateUserOnDatabase';
import UpdateUserInfoForm from '../types/UpdateUserInfoForm';
import UpdateUserInfoRequest from '../types/UpdateUserInfoRequest';

export default class UpdateUserDataController extends Controller implements IAssertiveController, IRestrictAccessController {
  validator: ResultAsyncFunction;

  authorizator: ResultAsyncFunction;

  constructor(validator: ResultAsyncFunction, authorizator: ResultAsyncFunction) {
    super();
    this.validator = validator;
    this.authorizator = authorizator;
  }

  async handle(request: UpdateUserInfoRequest): Promise<Result<UpdateUserInfoForm>> {
    // TODO collect formated form data from request body
    const updateUserInfoForm = { ...request.body };
    const { userId } = request.params;
    // Update user on database
    const updateUserInfoResult = await updateUserInfoOnDatabase(updateUserInfoForm, userId);
    return updateUserInfoResult;
  }
}
