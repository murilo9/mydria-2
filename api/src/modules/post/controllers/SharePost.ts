import IAssertiveController from '../../system/types/IAssertiveController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import getPostFromDatabase from '../db/getPostFromDatabase';
import insertPostOnDatabase from '../db/insertPostOnDatabase';
import CreatePostRequest from '../types/CreatePostRequest';
import Post from '../types/Post';
import Share from '../types/Share';

export default class SharePostController implements IAssertiveController {
  validator: ResultAsyncFunction;

  constructor(validator: ResultAsyncFunction) {
    this.validator = validator;
  }

  async handle(request: CreatePostRequest): Promise<Result<Post>> {
    const userId = request.headers['user-id'];
    const postToShareId = request.params.postId;
    const postToShare = await getPostFromDatabase(postToShareId);
    if (postToShare) {
      const shareToCreate: Share = {
        user: userId,
        created: new Date(),
        updated: new Date(),
        sharedFrom: postToShareId,
        ...request.body,
      };
      const sharePostResult = await insertPostOnDatabase(shareToCreate);
      return sharePostResult;
    }
    return {
      statusCode: 404,
      failed: true,
      payload: 'Post not found.',
    }
  }
}
