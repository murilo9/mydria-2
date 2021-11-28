import { Request } from 'express';
import CreateCommentForm from './CreateCommentForm';

export default interface CreateCommentRequest extends Request {
  body: CreateCommentForm
}
