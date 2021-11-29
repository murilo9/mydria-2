import IAssertiveController from '../../system/types/IAssertiveController';
import IRestrictAccessController from '../../system/types/IRestricAccessController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import insertCommentOnDatabase from '../db/insertCommentOnDatabase';
import Comment from '../types/Comment';
import CreateCommentRequest from '../types/CreateCommentRequest';

export default class CreateCommentController implements IAssertiveController, IRestrictAccessController {
  validator: ResultAsyncFunction;

  authorizator: ResultAsyncFunction;

  constructor(authorizator: ResultAsyncFunction, validator: ResultAsyncFunction) {
    this.authorizator = authorizator;
    this.validator = validator;
  }

  async handle(request: CreateCommentRequest): Promise<Result<Comment>> {
    const { postId } = request.params;
    const { requesterId } = request.headers
    const commentToCreate = {
      user: requesterId,
      post: postId,
      created: new Date(),
      updated: new Date(),
      ...request.body,
    };
    const createCommentResult = await insertCommentOnDatabase(commentToCreate);
    return createCommentResult;
  }
}
