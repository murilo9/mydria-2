import { Request } from 'express';
import Result from '../../system/types/Result';
import getUserFromDatabase from '../DAL/getUserFromDatabase';

/**
 * Verifies if user id from request JWT token matches user id from route
 */
export default async function userOwnsUser(request: Request): Promise<Result<string>> {
  console.log('authorizating...');
  const { userId } = request.params;
  const getRequestingUserFromDb = await getUserFromDatabase(userId);
  const requestingUserExists = getRequestingUserFromDb.payload;
  if (!requestingUserExists) {
    return {
      failed: true,
      payload: 'The user does not exist',
      statusCode: getRequestingUserFromDb.statusCode,
    };
  }
  // TODO verify JWT token
  return {
    failed: false,
  };
}
