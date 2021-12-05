import { Request } from 'express';
import Result from '../../system/types/Result';
import getPostCommentsFromDatabase from '../db/getPostCommentsFromDatabase';
import Comment from '../types/Comment';

export default class GetPostCommentsController {
  async handle(request: Request): Promise<Result<Comment[]>> {
    const { postId } = request.params;
    const getPostCommentsResult = await getPostCommentsFromDatabase(postId);
    return getPostCommentsResult;
  }
}
