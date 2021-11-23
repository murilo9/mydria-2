import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import Post from '../types/Post';
import UpdatePostForm from '../types/UpdatePostForm';

export default async function updatePostOnDatabase(postId: string, post: UpdatePostForm): Promise<Result<Post>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const postToUpdate = {
      updated: new Date(),
      ...post,
    };
    const updatePostResult = await (await db.collection('posts').findOneAndUpdate({ _id: new ObjectId(postId) }, { $set: { ...postToUpdate } }));
    return {
      failed: false,
      payload: updatePostResult.value as Post,
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
