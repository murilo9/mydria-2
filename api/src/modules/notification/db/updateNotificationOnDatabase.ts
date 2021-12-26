import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Notification from '../types/Notification';
import UpdateNotificationForm from '../types/UpdateNotificationForm';

export default async function updateNotificationOnDatabase(
  notificationId: string,
  notification: UpdateNotificationForm,
): Promise<Result<Notification>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const notificationToUpdate = {
      updated: new Date(),
      ...notification,
    };
    const updateNotificationResult = await (await db.collection('notifications')
      .findOneAndUpdate({ _id: new ObjectId(notificationId) }, { $set: { ...notificationToUpdate } }));
    return {
      failed: false,
      payload: updateNotificationResult.value as Notification,
      statusCode: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      failed: true,
      payload: error,
      statusCode: 500,
    };
  } finally {
    client.close();
  }
}
