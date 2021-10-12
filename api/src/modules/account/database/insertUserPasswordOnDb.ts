import getClient from '../../mongo/domain/getClient';
import { Result } from '../../utils/types';

export default async function insertUserPasswordOnDb(hash: string, userId: string): Promise<Result<string>> {
  const getClientResult = await getClient();
  if (getClientResult.failed) {
    return getClientResult.payload;
  }
  const client = getClientResult.payload;
  try {
    const db = client.db();
    const passwordData = {
      hash,
      userId,
    };
    const insertedPassword = await db.collection('passwords').insertOne(passwordData);
    return {
      failed: false,
      payload: insertedPassword,
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
