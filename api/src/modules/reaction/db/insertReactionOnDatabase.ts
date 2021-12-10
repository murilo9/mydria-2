import { MongoClient } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Reaction from '../types/Reaction';
import ReactionForm from '../types/ReactionForm';

export default async function insertReactionOnDatabase(reaction: ReactionForm): Promise<Result<Reaction>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const reactionToInsert = {
      created: new Date(),
      updated: new Date(),
      ...reaction,
    };
    await db.collection('reactions').insertOne(reactionToInsert);
    return {
      failed: false,
      payload: reactionToInsert,
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
