import { MongoClient, ObjectId } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import UpdateUserInfoForm from '../types/UpdateUserInfoForm';

export default async function updateUserInfoOnDatabase(user: UpdateUserInfoForm, userId: string): Promise<Result<UpdateUserInfoForm>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const userToUpdate = {
      ...user,
      updated: new Date(),
    };
    await db.collection('users').updateOne({ _id: new ObjectId(userId) }, { $set: { ...userToUpdate } });
    return {
      failed: false,
      statusCode: 200,
      payload: userToUpdate,
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
