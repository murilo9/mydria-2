import { Request } from 'express';
import Result from '../../system/types/Result';

export default function validateReaction(request: Request): Promise<Result<string>> {
  // TODO: verify if post or comment exists, verify if reaction type is valid
  return new Promise((resolve) => resolve({
    failed: false,
  }));
}
