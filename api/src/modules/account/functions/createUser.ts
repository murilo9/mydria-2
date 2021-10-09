import { Result } from '../../utils/types';
import User from '../types/User';
import UserInput from '../types/UserInput';
import getPasswordHash from './getPasswordHash';

export default async function createUser(
  user: UserInput,
  insertUserOnDb: (user: UserInput) => Promise<Result<string | User>>,
  insertUserPasswordOnDb: (password: string, userId: string) => Promise<Result<string>>,
): Promise<Result<User>> {
  const userData = { ...user };
  delete userData.password;
  const createUserResult = await insertUserOnDb(user);
  // If registering the user on the database was failed
  if (createUserResult.failed) {
    return createUserResult;
  }
  // Otherwise, register user password

  const createdUser = createUserResult.payload;
  const userId = createdUser._id;
  const passwordHash = await getPasswordHash(user.password);
  await insertUserPasswordOnDb(passwordHash, userId);
  return {
    failed: false,
    payload: createdUser,
    statusCode: 200,
  };
}
