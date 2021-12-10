import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Reaction from '../types/Reaction';

export default async function getReactionFromDatabase(userId: string, resourceId: string): Promise<Result<Reaction | null>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const reaction = await db.collection('reactions').findOne({ user: userId, resource: resourceId }) as Reaction;
    if (!reaction) {
      return {
        failed: true,
        statusCode: 404,
        payload: 'Post does not exist',
      }
    }

    return {
      failed: false,
      statusCode: 200,
      payload: reaction,
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
