import { Application } from 'express';
import makeRoute from '../system/helpers/makeRoute';
import verifyJWT from '../system/helpers/verifyJWT';
import userOwnsPost from './authorizators/userOwnsPost';
import CreatePostController from './controllers/CreatePost';
import RemovePostController from './controllers/RemovePost';
import SharePostController from './controllers/SharePost';
import UpdatePostController from './controllers/UpdatePost';
import validatePost from './validators/validatePost';
import validateShare from './validators/validateShare';

export default function postRoutes(app: Application) {
  app.post('/posts', verifyJWT, makeRoute(new CreatePostController(validatePost)));
  app.put('/post/:postId', verifyJWT, makeRoute(new UpdatePostController(userOwnsPost, validatePost)));
  app.delete('/post/:postId', verifyJWT, makeRoute(new RemovePostController(userOwnsPost)));
  app.post('/share/:postId', verifyJWT, makeRoute(new SharePostController(validateShare)));
}
