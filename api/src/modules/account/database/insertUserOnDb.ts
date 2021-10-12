import getClient from '../../mongo/domain/getClient';
import { Result } from '../../utils/types';
import User from '../types/User';
import UserInput from '../types/UserInput';

export default async function insertUserOnDb(user: UserInput): Promise<Result<string | User>> {
  const getClientResult = await getClient();
  if (getClientResult.failed) {
    return getClientResult.payload;
  }
  const client = getClientResult.payload;
  try {
    const db = client.db();
    const createdUser = await db.collection('users').insertOne({
      ...user,
      created: new Date(),
      updated: new Date(),
    });
    return {
      failed: false,
      payload: createdUser,
      statusCode: 200,
    };
  } catch (error) {
    return {
      failed: true,
      payload: error,
      statusCode: 500,
    };
  } finally {
    client.close();
  }
}
