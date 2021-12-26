import { MongoClient } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Follow from '../types/Follow';
import FollowForm from '../types/FollowForm';

export default async function insertFollowOnDatabase(follow: FollowForm): Promise<Result<Follow>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const followToInsert = {
      created: new Date(),
      updated: new Date(),
      ...follow,
    };
    await db.collection('follows').insertOne(followToInsert);
    return {
      failed: false,
      payload: followToInsert,
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
