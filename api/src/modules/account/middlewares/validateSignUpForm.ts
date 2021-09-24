import { Response } from 'express';
import { SignUpRequest } from '../types';

export default function validateSignUpRequest(req: SignUpRequest, res: Response, next: Function) {
  // TODO: throw errors under validation failure and catch block
  next(req, res);
}
