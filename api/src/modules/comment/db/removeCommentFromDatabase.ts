import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';

export default async function removeCommentFromDatabase(commentId: string): Promise<Result<string>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    await (await db.collection('comments').deleteOne({ _id: new ObjectId(commentId) }));
    return {
      failed: false,
      payload: 'Comment removed successfully',
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
