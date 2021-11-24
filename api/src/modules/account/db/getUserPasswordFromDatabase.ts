import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import { UserPassword } from '../types/UserPassword';

export default async function getUserPasswordFromDatabase(userId: string): Promise<Result<UserPassword | null>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const password = await db.collection('passwords').findOne({ userId: new ObjectId(userId) }) as UserPassword;
    return {
      failed: !password,
      statusCode: password ? 200 : 404,
      payload: password || null,
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
