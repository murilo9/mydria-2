import { Response } from 'express';
import { Result } from '../../utils/types';
import User from '../types/User';
import UserInput from '../types/UserInput';
import getPasswordHash from '../functions/getPasswordHash';
import ValidatedSignUpRequest from '../types/ValidatedSignUpRequest';

export default async function createUser(
  req: ValidatedSignUpRequest,
  res: Response,
  next: Function,
  insertUserOnDb: (user: UserInput) => Promise<Result<string | User>>,
  insertUserPasswordOnDb: (password: string, userId: string) => Promise<Result<string>>,
) {
  const userData = { ...req.validatedSignUpForm };
  delete userData.password;
  const createUserResult = await insertUserOnDb(userData);
  if (!createUserResult.failed) {
    const createdUser = createUserResult.payload;
    const userId = createdUser._id;
    const passwordHash = await getPasswordHash(req.validatedSignUpForm.password);
    await insertUserPasswordOnDb(passwordHash, userId);
    res.status(createUserResult.statusCode);
    res.write(createUserResult.payload);
    next();
  } else {
    res.status(createUserResult.statusCode);
    res.send(createUserResult.payload);
  }
}
