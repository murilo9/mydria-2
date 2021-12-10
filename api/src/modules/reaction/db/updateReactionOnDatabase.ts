import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Reaction from '../types/Reaction';
import ReactionType from '../types/ReactionType';

export default async function updateReactionOnDatabase(reactionId: string, type: ReactionType): Promise<Result<Reaction>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const reactionToUpdate = {
      updated: new Date(),
      type,
    };
    const updateReactionResult = await (await db.collection('reactions')
      .findOneAndUpdate({ _id: new ObjectId(reactionId) }, { $set: { ...reactionToUpdate } }));
    return {
      failed: false,
      payload: updateReactionResult.value as Reaction,
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
