import IAssertiveController from '../../system/types/IAssertiveController';
import IRestrictAccessController from '../../system/types/IRestricAccessController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import updatePostOnDatabase from '../db/updatePostOnDatabase';
import UpdatePostRequest from '../types/UpdatePostRequest';
import Post from '../types/Post';

export default class UpdatePostController implements IAssertiveController, IRestrictAccessController {
  validator: ResultAsyncFunction;

  authorizator: ResultAsyncFunction;

  constructor(authorizator: ResultAsyncFunction, validator: ResultAsyncFunction) {
    this.authorizator = authorizator;
    this.validator = validator;
  }

  async handle(request: UpdatePostRequest): Promise<Result<Post>> {
    const { postId } = request.params;
    const postToUpdate = {
      ...request.body,
    };
    // TODO: update only the allowed fields
    const updatePostResult = await updatePostOnDatabase(postId, postToUpdate);
    return updatePostResult;
  }
}
