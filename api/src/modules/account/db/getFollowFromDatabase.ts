import { MongoClient } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import FollowedBy from '../types/Follow';

/**
 * Get people who follows the user
 * @param userId
 * @returns
 */
export default async function getFollowFromDatabase(userId: string): Promise<Result<FollowedBy[]>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const follows = await db.collection('follows').find({ user: userId }).toArray() as FollowedBy[];
    return {
      failed: false,
      statusCode: 200,
      payload: follows,
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
