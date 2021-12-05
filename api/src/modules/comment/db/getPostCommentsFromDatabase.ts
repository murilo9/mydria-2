import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Comment from '../types/Comment';

export default async function getPostCommentsFromDatabase(postId: string): Promise<Result<Comment[] | null>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const collection = db.collection<Comment>('comments')
    const comments = await collection.find({ post: postId }).toArray() as Comment[];
    return {
      failed: false,
      statusCode: 200,
      payload: comments,
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
