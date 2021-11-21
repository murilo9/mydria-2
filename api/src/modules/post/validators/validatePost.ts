import Result from '../../system/types/Result';
import CreatePostRequest from '../types/CreatePostRequest';

export default function validatePost(request: CreatePostRequest): Promise<Result<string>> {
  console.log('validating...');
  return new Promise((resolve) => resolve({
    failed: false,
  }));
}
