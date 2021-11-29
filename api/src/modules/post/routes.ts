import { Application } from 'express';
import userOwnsUser from '../account/authorizators/userOwnsUser';
import makeRoute from '../system/helpers/makeRoute';
import verifyJWT from '../system/helpers/verifyJWT';
import userOwnsPost from './authorizators/userOwnsPost';
import CreatePostController from './controllers/CreatePost';
import RemovePostController from './controllers/RemovePost';
import UpdatePostController from './controllers/UpdatePost';
import validatePost from './validators/validatePost';

export default function postRoutes(app: Application) {
  app.post('/user/:userId/posts', verifyJWT, makeRoute(new CreatePostController(userOwnsUser, validatePost)));
  app.put('/post/:postId', verifyJWT, makeRoute(new UpdatePostController(userOwnsPost, validatePost)));
  app.delete('/post/:postId', verifyJWT, makeRoute(new RemovePostController(userOwnsPost)));
}