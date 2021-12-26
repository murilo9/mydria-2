import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';

export default async function removeFollowFromDatabase(user: string, by: string): Promise<Result<string>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    await (await db.collection('follows').deleteOne({ user, by }));
    return {
      failed: false,
      payload: 'Follow removed successfully',
      statusCode: 200,
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
