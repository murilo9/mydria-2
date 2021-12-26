import { MongoClient } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import CreateNotificationForm from '../types/CreateNotificationForm';
import Notification from '../types/Notification';

export default async function insertNotificationOnDatabase(notification: CreateNotificationForm): Promise<Result<Notification>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const notificationToInsert = {
      created: new Date(),
      updated: new Date(),
      seen: false,
      ...notification,
    };
    await db.collection('notifications').insertOne(notificationToInsert);
    return {
      failed: false,
      payload: notificationToInsert,
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
