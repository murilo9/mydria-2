import { Request } from 'express';
import IRestrictAccessController from '../../system/types/IRestricAccessController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import removeNotificationFromDatabase from '../db/reoveNotificationFromDatabase';

export default class RemoveNotificationController implements IRestrictAccessController {
  authorizator: ResultAsyncFunction;

  constructor(authorizator: ResultAsyncFunction) {
    this.authorizator = authorizator;
  }

  async handle(request: Request): Promise<Result<string>> {
    const { notificationId } = request.params;
    const removeNotificationResult = await removeNotificationFromDatabase(notificationId);
    return removeNotificationResult;
  }
}
