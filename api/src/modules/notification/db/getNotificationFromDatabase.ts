import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Notification from '../types/Notification';

export default async function getNotificationFromDatabase(notificationId: string): Promise<Result<Notification | string>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const notification = await db.collection('notifications').findOne({ _id: new ObjectId(notificationId) }) as Notification;
    if (!notification) {
      return {
        failed: true,
        statusCode: 404,
        payload: 'Notification does not exist',
      }
    }

    return {
      failed: false,
      statusCode: 200,
      payload: notification,
    }
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
