import { Request } from 'express';
import Result from '../../system/types/Result';
import getCommentFromDatabase from '../db/getCommentFromDatabase';

/**
 * Verifies if user id from request JWT token matches user id from comment
 */
export default async function userOwnsComment(request: Request): Promise<Result<string>> {
  console.log('Authorizating: userOwnsComment');
  const { commentId } = request.params;
  const userId = request.headers['user-id'];
  const getCommentFromDb = await getCommentFromDatabase(commentId);
  if (getCommentFromDb.failed) {
    return getCommentFromDb
  }
  const comment = getCommentFromDb.payload;
  const userOwnsComment = comment.user === userId;
  return {
    failed: !userOwnsComment,
    payload: !userOwnsComment ? 'User does not own the post' : null,
    statusCode: userOwnsComment ? 200 : 403,
  }
}
