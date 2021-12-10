import { Application } from 'express';
import makeRoute from '../system/helpers/makeRoute';
import verifyJWT from '../system/helpers/verifyJWT';
import userOwnsReactionIfExists from './authorizators/userOwnsReactionIfExists';
import ReactController from './controller/React';
import validateReaction from './validators/validateReaction';

export default function reactionRoutes(app: Application) {
  app.post('/post/:postId/reactions/:type', verifyJWT, makeRoute(new ReactController(validateReaction, userOwnsReactionIfExists)))
  app.post('/comment/:commentId/reactions/:type', verifyJWT, makeRoute(new ReactController(validateReaction, userOwnsReactionIfExists)))
}
