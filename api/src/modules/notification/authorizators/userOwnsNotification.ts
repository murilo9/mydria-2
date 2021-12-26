import { Request } from 'express';
import Result from '../../system/types/Result';
import getNotificationFromDatabase from '../db/getNotificationFromDatabase';

export default async function userOwnsNotification(request: Request): Promise<Result<string>> {
  const { notificationId } = request.params;
  const userId = request.headers['user-id'];
  const getNotificationFromDb = await getNotificationFromDatabase(notificationId);
  if (getNotificationFromDb.failed) {
    return getNotificationFromDb
  }
  const notification = getNotificationFromDb.payload;
  const userOwnsNotification = notification.user === userId;
  return {
    failed: !userOwnsNotification,
    payload: !userOwnsNotification ? 'User does not own the post' : null,
    statusCode: userOwnsNotification ? 200 : 403,
  }
}
