import { Request } from 'express';
import IAssertiveController from '../../system/types/IAssertiveController';
import IRestrictAccessController from '../../system/types/IRestricAccessController';
import Result from '../../system/types/Result';
import ResultAsyncFunction from '../../system/types/ResultAsyncFunction';
import getReactionFromDatabase from '../db/getReactionFromDatabase';
import insertReactionOnDatabase from '../db/insertReactionOnDatabase';
import removeReactionFromDatabase from '../db/removeReactionFromDatabase';
import updateReactionOnDatabase from '../db/updateReactionOnDatabase';
import Reaction from '../types/Reaction';
import ReactionType from '../types/ReactionType';

export default class ReactController implements IAssertiveController, IRestrictAccessController {
  validator: ResultAsyncFunction;

  authorizator: ResultAsyncFunction;

  constructor(validator: ResultAsyncFunction, authorizator: ResultAsyncFunction) {
    this.validator = validator;
    this.authorizator = authorizator;
  }

  async handle(request: Request): Promise<Result<Reaction | string>> {
    const userId = request.headers['user-id'] as string;
    const resourceId = request.params.postId || request.params.commentId
    const type = request.params.type as ReactionType
    // Verify if reaction exists
    const reactionExists = await getReactionFromDatabase(userId, resourceId)
    // If reaction exists, update it (if is opposite) or remove it (if is same)
    if (reactionExists.payload) {
      const reaction = reactionExists.payload as Reaction
      if (reaction.type === type) {
        const removeReactionResult = await removeReactionFromDatabase(reaction._id);
        return removeReactionResult;
      }
      const updateReactionResult = await updateReactionOnDatabase(resourceId, type);
      return updateReactionResult;
    }
    // If reacton does not exist, create it
    const reactionToCreate = {
      user: userId,
      created: new Date(),
      updated: new Date(),
      resource: resourceId,
      type: request.body.type,
    };
    const createReactionResult = await insertReactionOnDatabase(reactionToCreate);
    return createReactionResult;
  }
}
