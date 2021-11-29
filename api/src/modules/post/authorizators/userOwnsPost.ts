import { Request } from 'express';
import Result from '../../system/types/Result';
import getPostFromDatabase from '../db/getPostFromDatabase';

/**
 * Verifies if user id from request JWT token matches user id from post
 */
export default async function userOwnsPost(request: Request): Promise<Result<string>> {
  console.log('authorizating...');
  const { postId } = request.params;
  const getPostFromDb = await getPostFromDatabase(postId);
  if (getPostFromDb.failed) {
    return getPostFromDb
  }
  // TODO verify user id from JWT token with post user
  return {
    failed: false,
  };
}
