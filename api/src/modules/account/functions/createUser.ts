import { Result } from '../../utils/types';
import User from '../types/User';
import UserInput from '../types/UserInput';

export default function createUser(
  user: UserInput,
  insertUserOnDb: (user: UserInput) => Result<string | User>,
  insertUserPasswordOnDb: (password: string, userId: string) => Result<string>,
): Promise<Result<User>> {

}
