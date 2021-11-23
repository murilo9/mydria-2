import { Application } from 'express';
import userOwnsUser from '../account/authorizators/userOwnsUser';
import makeRoute from '../system/helpers/makeRoute';
import userOwnsPost from './authorizators/userOwnsPost';
import CreatePostController from './controllers/CreatePost';
import RemovePostController from './controllers/RemovePost';
import UpdatePostController from './controllers/UpdatePost';
import validatePost from './validators/validatePost';

export default function postRoutes(app: Application) {
  app.post('/user/:userId/posts', makeRoute(new CreatePostController(userOwnsUser, validatePost)));
  app.put('/post/:postId', makeRoute(new UpdatePostController(userOwnsPost, validatePost)));
  app.delete('/post/:postId', makeRoute(new RemovePostController(userOwnsPost)));
}
