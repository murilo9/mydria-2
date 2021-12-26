import insertNotificationOnDatabase from '../../notification/db/insertNotificationOnDatabase';
import NotificationType from '../../notification/types/NotificationType';
import getPostFromDatabase from '../../post/db/getPostFromDatabase';
import Post from '../../post/types/Post';
import IAssertiveController from '../../system/types/IAssertiveController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import insertCommentOnDatabase from '../db/insertCommentOnDatabase';
import Comment from '../types/Comment';
import CreateCommentRequest from '../types/CreateCommentRequest';

export default class CreateCommentController implements IAssertiveController {
  validator: ResultAsyncFunction;

  constructor(validator: ResultAsyncFunction) {
    this.validator = validator;
  }

  async handle(request: CreateCommentRequest): Promise<Result<Comment>> {
    const { postId } = request.params;
    const userId = request.headers['user-id'];
    const commentToCreate = {
      user: userId,
      post: postId,
      created: new Date(),
      updated: new Date(),
      ...request.body,
    };
    const createCommentResult = await insertCommentOnDatabase(commentToCreate);
    // Create notification for comment
    const getPostFromDb = await getPostFromDatabase(postId);
    if (getPostFromDb.failed) {
      return getPostFromDb;
    }
    const post = getPostFromDb.payload as Post
    const postOwner = post.user
    const commentNotification = {
      type: NotificationType.POST_COMMENT,
      user: postOwner,
      url: 'TODO',
    }
    await insertNotificationOnDatabase(commentNotification);
    return createCommentResult;
  }
}
