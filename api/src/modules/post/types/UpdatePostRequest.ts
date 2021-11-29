import { Request } from 'express';
import UpdatePostForm from './UpdatePostForm';

export default interface UpdatePostRequest extends Request {
  body: UpdatePostForm
}
