import { Request } from 'express';
import UpdateCommentForm from './UpdateCommentForm';

export default interface UpdateCommentRequest extends Request {
  body: UpdateCommentForm
}
