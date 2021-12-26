import { Request } from 'express';
import IRestrictAccessController from '../../system/types/IRestricAccessController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import updateNotificationOnDatabase from '../db/updateNotificationOnDatabase';
import Notification from '../types/Notification';

export default class SeeNotificationController implements IRestrictAccessController {
  authorizator: ResultAsyncFunction;

  constructor(authorizator: ResultAsyncFunction) {
    this.authorizator = authorizator;
  }

  async handle(request: Request): Promise<Result<Notification>> {
    const { notificationId } = request.params;
    const notificatonToUpdate = {
      seen: true,
    };
    const updateNotificationResult = await updateNotificationOnDatabase(notificationId, notificatonToUpdate);
    return updateNotificationResult;
  }
}
