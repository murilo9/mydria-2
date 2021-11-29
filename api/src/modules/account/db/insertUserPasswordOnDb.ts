import { MongoClient } from 'mongodb';
import getClient from '../../mongo/functions/getClient';
import Result from '../../system/types/Result';
import { UserPassword } from '../types/UserPassword';

export default async function inserUserPasswordOnDatabase(hash: string, userId: string): Promise<Result<UserPassword>> {
  const requestClientResult = await getClient();
  if (requestClientResult.failed) {
    return requestClientResult;
  }
  const client = requestClientResult.payload as MongoClient;
  const db = client.db();
  try {
    const passwordToInsert = {
      created: new Date(),
      updated: new Date(),
      hash,
      userId,
    };
    await db.collection('passwords').insertOne(passwordToInsert);
    return {
      failed: false,
      payload: passwordToInsert,
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
