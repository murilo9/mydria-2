import { Application } from 'express';
import userOwnsUser from '../account/authorizators/userOwnsUser';
import makeRoute from '../system/helpers/makeRoute';
import verifyJWT from '../system/helpers/verifyJWT';
import CreateCommentController from './controllers/CreateComment';
import validateComment from './validators/validateComment';

export default function postRoutes(app: Application) {
  app.post('/post/:postId/:userId', verifyJWT, makeRoute(new CreateCommentController(userOwnsUser, validateComment)))
}
