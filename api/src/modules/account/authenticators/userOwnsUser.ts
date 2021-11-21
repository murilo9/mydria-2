import { Request } from 'express';
import Result from '../../system/types/Result';

export default async function userOwnsUser(request: Request): Promise<Result<string>> {
  console.log('authenticating...');
  // TODO: verify if user id from request JWT token matches user id from route
  return {
    failed: false,
  };
}
