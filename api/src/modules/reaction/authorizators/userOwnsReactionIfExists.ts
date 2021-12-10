import { Request } from 'express';
import Result from '../../system/types/Result';
import getReactionFromDatabase from '../db/getReactionFromDatabase';

/**
 * Verifies if user id from request JWT token matches user id from reaction, if it exists
 */
export default async function userOwnsReactionIfExists(request: Request): Promise<Result<any>> {
  const { postId, commentId } = request.params;
  const resourceId = postId || commentId;
  const userId = request.headers['user-id'] as string;
  const getReactionFromDb = await getReactionFromDatabase(resourceId, userId);
  if (getReactionFromDb.statusCode === 500) {
    return getReactionFromDb;
  }
  // If reaction exists, verify if user owns it
  if (getReactionFromDb.payload) {
    const reaction = getReactionFromDb.payload;
    // If the user does not own it, unauthorize it
    if (reaction.user !== userId) {
      return {
        failed: true,
        payload: 'User does not own this reaction',
        statusCode: 403,
      }
    }
  }
  // Ends here if the user owns the reaction OR if the reaction does not exist yet
  return {
    failed: false,
  }
}
