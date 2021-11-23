import { Request } from 'express';
import CreatePostForm from './CreatePostForm';

export default interface CreatePostRequest extends Request {
  body: CreatePostForm
}
