import Result from '../../system/types/Result';
import CreatePostRequest from '../types/CreatePostRequest';

export default function validatePost(request: CreatePostRequest): Promise<Result<string>> {
  return new Promise((resolve) => resolve({
    failed: false,
  }));
}
