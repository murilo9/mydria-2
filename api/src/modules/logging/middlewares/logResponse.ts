import { Request, Response } from 'express';
import { ResponseLog } from '../types';
import writeLog from '../functions/writeLog';

export default async function logResponse(req: Request, res: Response) {
  const responseLog: ResponseLog = {
    statusCode: res.statusCode,
    body: { ...req.body },
  };
  await writeLog(responseLog);
  res.end();
}
