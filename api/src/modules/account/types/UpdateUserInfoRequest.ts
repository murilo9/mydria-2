import { Request } from 'express';
import UpdateUserInfoForm from './UpdateUserInfoForm';

export default interface UpdateUserInfoRequest extends Request {
  body: UpdateUserInfoForm;
};
