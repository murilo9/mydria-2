import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import User from '../types/User';

export default async function getUserFromDatabase(userId: string): Promise<Result<User | null>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) }) as User;
    return {
      failed: !user,
      statusCode: user ? 200 : 404,
      payload: user || null,
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
