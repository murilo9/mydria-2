import { MongoClient } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Post from '../types/Post';
import PostInput from '../types/PostInput';

export default async function insertPostOnDatabase(post: PostInput): Promise<Result<Post>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const postToInsert = {
      created: new Date(),
      updated: new Date(),
      ...post,
    };
    await db.collection('posts').insertOne(postToInsert);
    return {
      failed: false,
      payload: postToInsert,
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
