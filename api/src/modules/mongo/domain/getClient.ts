import { MongoClient } from 'mongodb';
import { Result } from '../../utils/types';
import writeLog from '../../logging/functions/writeLog';

const PORT = process.env.MONGODB_CONNECTION_PORT || '27017';
const DB_NAME = process.env.MONGODB_DATABASE || 'mydria_db';
const USER = process.env.MONGODB_USERNAME || 'mydria';
const PASSWORD = process.env.MONGODB_PASSWORD;

export default async function getClient(): Promise<Result<MongoClient>> {
  try {
    console.log('getting mongo client:', PORT, DB_NAME, USER, PASSWORD);
    const mongoClient = await MongoClient.connect(`mongodb://${USER}:${PASSWORD}@localhost:${PORT}/${DB_NAME}`);
    return {
      failed: false,
      payload: mongoClient,
    };
  } catch (error) {
    await writeLog({ error });
    return {
      failed: true,
      statusCode: 500,
      payload: 'Erro ao requisitar client mongodb',
    };
  }
}
