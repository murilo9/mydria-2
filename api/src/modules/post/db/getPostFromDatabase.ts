import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Post from '../types/Post';

export default async function getPostFromDatabase(postId: string): Promise<Result<Post | null>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const post = await db.collection('posts').findOne({ _id: new ObjectId(postId) }) as Post;
    if (!post) {
      return {
        failed: true,
        statusCode: 404,
        payload: 'Post does not exist',
      }
    }

    return {
      failed: false,
      statusCode: 200,
      payload: post,
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
