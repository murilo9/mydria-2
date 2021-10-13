import { Request } from 'express';
import Result from '../../system/types/Result';

export default async function validateSignUpForm(request: Request): Promise<Result<string>> {
  console.log('validating...');
  return {
    failed: false,
  };
}
