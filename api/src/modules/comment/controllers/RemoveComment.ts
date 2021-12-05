import { Request } from 'express';
import IRestrictAccessController from '../../system/types/IRestricAccessController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import removeCommentFromDatabase from '../db/removeCommentFromDatabase';

export default class RemoveCommentController implements IRestrictAccessController {
  authorizator: ResultAsyncFunction;

  constructor(authorizator: ResultAsyncFunction) {
    this.authorizator = authorizator;
  }

  async handle(request: Request): Promise<Result<string>> {
    const { commentId } = request.params;
    const removeCommentResult = await removeCommentFromDatabase(commentId);
    return removeCommentResult;
  }
}
