import { Request } from 'express';
import IRestrictAccessController from '../../system/types/IRestricAccessController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import removePostFromDatabase from '../db/removePostFromDatabase';

export default class RemovePostController implements IRestrictAccessController {
  authorizator: ResultAsyncFunction;

  constructor(authorizator: ResultAsyncFunction) {
    this.authorizator = authorizator;
  }

  async handle(request: Request): Promise<Result<string>> {
    const { postId } = request.params;
    const removePostResult = await removePostFromDatabase(postId);
    return removePostResult;
  }
}
