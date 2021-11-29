import IAssertiveController from "../../system/types/IAssertiveController";
import IRestrictAccessController from "../../system/types/IRestricAccessController";
import Result from "../../system/types/Result";
import ResultAsyncFunction from "../../system/types/ResultAsyncFunction";
import updateCommentOnDatabase from "../db/updateCommentOnDatabase";
import UpdateCommentForm from "../types/UpdateCommentForm";
import UpdateCommentRequest from "../types/UpdateCommentRequest";

export default class UpdateCommentController implements IAssertiveController, IRestrictAccessController {
  validator: ResultAsyncFunction;

  authorizator: ResultAsyncFunction;

  constructor(authorizator: ResultAsyncFunction, validator: ResultAsyncFunction) {
    this.authorizator = authorizator;
    this.validator = validator;
  }

  async handle(request: UpdateCommentRequest): Promise<Result<UpdateCommentForm>> {
    const { commentId } = request.params;
    const commentToUpdate= {
      body: request.body.body,
    };
    const updateCommentResult= await updateCommentOnDatabase(commentId, commentToUpdate);
    return updateCommentResult;
  }
}