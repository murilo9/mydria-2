import { Application } from 'express';
import makeRoute from '../system/helpers/makeRoute';
import verifyJWT from '../system/helpers/verifyJWT';
import userOwnsComment from './authorizators/userOwnsComment';
import CreateCommentController from './controllers/CreateComment';
import RemoveCommentController from './controllers/RemoveComment';
import UpdateCommentController from './controllers/UpdateComment';
import validateComment from './validators/validateComment';

export default function postRoutes(app: Application) {
  app.post('/post/:postId/comments', verifyJWT, makeRoute(new CreateCommentController(validateComment)))
  app.put('/post/:postId/comment/:commentId', verifyJWT, makeRoute(new UpdateCommentController(userOwnsComment, validateComment)))
  app.delete('/post/:postId/comment/:commentId', verifyJWT, makeRoute(new RemoveCommentController(userOwnsComment)))
}
