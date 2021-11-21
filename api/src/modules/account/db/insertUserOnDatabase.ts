import { MongoClient } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import User from '../types/User';
import UserInput from '../types/UserInput';

export default async function inserUserOnDatabase(user: UserInput): Promise<Result<User>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const userToInsert = {
      created: new Date(),
      updated: new Date(),
      ...user,
    };
    await db.collection('users').insertOne(userToInsert);
    return {
      failed: false,
      payload: userToInsert,
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
