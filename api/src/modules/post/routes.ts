import { Application } from 'express';
import userOwnsUser from '../account/authorizators/userOwnsUser';
import makeRoute from '../system/helpers/makeRoute';
import CreatePostController from './controllers/CreatePost';
import validatePost from './validators/validatePost';

export default function postRoutes(app: Application) {
  app.post('/user/:userId/posts', makeRoute(new CreatePostController(userOwnsUser, validatePost)));
}
