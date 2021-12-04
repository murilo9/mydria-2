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
    return createCommentResult;
  }
}
