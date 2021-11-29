import { MongoClient } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Comment from '../types/Comment';
import CreateCommentForm from '../types/CreateCommentForm';

export default async function insertCommentOnDatabase(comment: CreateCommentForm): Promise<Result<Comment>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const commentToInsert = {
      created: new Date(),
      updated: new Date(),
      ...comment,
    };
    await db.collection('comments').insertOne(commentToInsert);
    return {
      failed: false,
      payload: commentToInsert,
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
