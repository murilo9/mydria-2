import { Request } from 'express';
import getCommentFromDatabase from '../../comment/db/getCommentFromDatabase';
import insertNotificationOnDatabase from '../../notification/db/insertNotificationOnDatabase';
import NotificationType from '../../notification/types/NotificationType';
import getPostFromDatabase from '../../post/db/getPostFromDatabase';
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
    const reactionType = request.params.type === 'like' ? ReactionType.LIKE : ReactionType.DISLIKE
    // Verify if reaction exists
    const reactionExists = await getReactionFromDatabase(userId, resourceId)
    // If reaction exists, update it (if is opposite) or remove it (if is same)
    if (reactionExists.statusCode === 200) {
      const reaction = reactionExists.payload as Reaction
      const reactionId = reaction._id;
      if (reaction.type === reactionType) {
        const removeReactionResult = await removeReactionFromDatabase(reactionId);
        return removeReactionResult;
      }
      const updateReactionResult = await updateReactionOnDatabase(reactionId, reactionType);
      return updateReactionResult;
    }
    // If reacton does not exist, create it
    const reactionToCreate = {
      user: userId,
      created: new Date(),
      updated: new Date(),
      resource: resourceId,
      type: reactionType,
    };
    const createReactionResult = await insertReactionOnDatabase(reactionToCreate);
    // Create notification for the reaction
    let notificationType = null;
    const resourcePost = await getPostFromDatabase(resourceId);
    const resourceComment = await getCommentFromDatabase(resourceId);
    // If reacted to post
    if (!resourcePost.failed) {
      notificationType = NotificationType.POST_REACTION
    }
    // If reacted to comment
    if (!resourceComment.failed) {
      notificationType = NotificationType.COMMENT_REACTION
    }
    // If neither
    if (!notificationType) {
      return {
        failed: true,
        statusCode: 404,
        payload: 'The resource (post or comment) was not found',
      }
    }
    // Finally, insert the notification on database
    const reactionNotification = {
      type: notificationType,
      user: userId,
      url: 'TODO',
    }
    const createNotificationResult = await insertNotificationOnDatabase(reactionNotification);
    if (createNotificationResult.failed) {
      return createNotificationResult
    }
    return createReactionResult;
  }
}
