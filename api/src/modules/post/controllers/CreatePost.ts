import IAssertiveController from '../../system/types/IAssertiveController';
import IRestrictAccessController from '../../system/types/IRestricAccessController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import insertPostOnDatabase from '../db/insertPostOnDatabase';
import CreatePostRequest from '../types/CreatePostRequest';
import Post from '../types/Post';

export default class CreatePostController implements IAssertiveController, IRestrictAccessController {
  validator: ResultAsyncFunction;

  authorizator: ResultAsyncFunction;

  constructor(authorizator: ResultAsyncFunction, validator: ResultAsyncFunction) {
    this.authorizator = authorizator;
    this.validator = validator;
  }

  async handle(request: CreatePostRequest): Promise<Result<Post>> {
    const { userId } = request.params;
    const postToCreate = {
      user: userId,
      created: new Date(),
      updated: new Date(),
      ...request.body,
    };
    const createPostResult = await insertPostOnDatabase(postToCreate);
    return createPostResult;
  }
}
