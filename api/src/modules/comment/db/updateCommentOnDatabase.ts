import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Comment from '../types/Comment';
import UpdateCommentForm from '../types/UpdateCommentForm';

export default async function updateCommentOnDatabase(commentId: string, comment: UpdateCommentForm): Promise<Result<UpdateCommentForm>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const commentToUpdate = {
      updated: new Date(),
      ...comment,
    };
    await db.collection('comments').updateOne({_id: new ObjectId(commentId)}, {$set: {...commentToUpdate}});
    return {
      failed: false,
      payload: commentToUpdate,
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
