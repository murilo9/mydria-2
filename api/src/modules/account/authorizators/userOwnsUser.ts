import { Request } from 'express';
import Result from '../../system/types/Result';
import getUserFromDatabase from '../DAL/getUserFromDatabase';

/**
 * Verifies if user id from request JWT token matches user id from route
 */
export default async function userOwnsUser(request: Request): Promise<Result<string>> {
  console.log('authorizating...');
}
