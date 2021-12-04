import { Request } from 'express';
import Result from '../../system/types/Result';
import getPostFromDatabase from '../db/getPostFromDatabase';

/**
 * Verifies if user id from request JWT token matches user id from post
 */
export default async function userOwnsPost(request: Request): Promise<Result<string>> {
  console.log('Authorizating: userOwnsPost');
  const { postId } = request.params;
  const userId = request.headers['user-id'];
  const getPostFromDb = await getPostFromDatabase(postId);
  if (getPostFromDb.failed) {
    return getPostFromDb
  }
  const post = getPostFromDb.payload;
  const userOwnsPost = post.user === userId;
  return {
    failed: !userOwnsPost,
    payload: !userOwnsPost ? 'User does not own the post' : null,
    statusCode: userOwnsPost ? 200 : 403,
  }
}
