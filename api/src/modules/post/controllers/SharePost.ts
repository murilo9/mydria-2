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
    const getPostToShare = await getPostFromDatabase(postToShareId);
    if (getPostToShare.failed) {
      return getPostToShare
    }
    const postToShare = getPostToShare.payload
    if (postToShare.sharedFrom) {
      return {
        failed: true,
        statusCode: 400,
        payload: 'Cannot share a share',
      }
    }
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
}
