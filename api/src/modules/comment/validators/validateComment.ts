import Result from '../../system/types/Result';
import CreateCommentRequest from '../types/CreateCommentRequest';

export default function validateComment(request: CreateCommentRequest): Promise<Result<string>> {
  return new Promise((resolve) => resolve({
    failed: false,
  }));
}
