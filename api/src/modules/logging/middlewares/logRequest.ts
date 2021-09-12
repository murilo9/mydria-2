import { Request, Response } from 'express';
import { RequestLog } from '../types';
import writeLog from '../functions/writeLog';

export default async function logRequest(req: Request, res: Response, next: Function) {
  const requestLog: RequestLog = {
    headers: {
      'x-access-token': req.headers['x-access-token'],
    },
    body: { ...req.body },
  };
  await writeLog(requestLog);
  next();
}
