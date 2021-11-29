import { Request } from 'express';
import bcrypt from 'bcrypt';
import Result from '../../system/types/Result';
import getUserFromDatabaseByEmail from '../db/getUserFromDatabaseByEmail';
import getUserPasswordFromDatabase from '../db/getUserPasswordFromDatabase';

export default async function validateSignInForm(request: Request): Promise<Result<string>> {
  const { email, password } = request.body;
  // Verify if user exists
  const getUser = await getUserFromDatabaseByEmail(email);
  if (getUser.failed) {
    return getUser;
  }
  const user = getUser.payload;
  const userId = user._id;
  // Get user password hash
  const getPassword = await getUserPasswordFromDatabase(userId);
  if (getPassword.failed) {
    return getPassword;
  }
  const userPassword = getPassword.payload;
  const { hash } = userPassword;
  // Verify if password and hash match
  console.log(password, hash)
  const match = await bcrypt.compare(password, hash);
  if (!match) {
    console.log('no match', hash)
    return {
      failed: true,
      payload: 'Invalid e-mail or password.',
      statusCode: 400,
    }
  }
  return {
    failed: false,
  }
}
