import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Notification from '../types/Notification';

export default async function getNotificationsFromDatabase(userId: string): Promise<Result<Notification[] | string>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const notifications = await db.collection('notifications').find({ user: userId }).toArray() as Notification[];
    return {
      failed: false,
      statusCode: 200,
      payload: notifications,
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
