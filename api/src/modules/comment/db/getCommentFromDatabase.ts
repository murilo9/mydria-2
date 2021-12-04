import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Comment from '../types/Comment';

export default async function getCommentFromDatabase(commentId: string): Promise<Result<Comment>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const comment = await db.collection('comments').findOne({ _id: new ObjectId(commentId) }) as Comment;
    if (!comment) {
      return {
        failed: true,
        payload: 'The comment does not exist',
        statusCode: 404,
      }
    }
    return {
      failed: false,
      payload: comment,
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
