import { Request } from 'express';

/**
 * Returns if a request has a failed statusCode set.
 * @param req
 */
export default function requestNotFailed(req: Request): boolean {
  const statusCodeIsSet = !(req.statusCode === null || req.statusCode === undefined);
  // If statusCode is not set, then the request is still valid
  if (!statusCodeIsSet) {
    return true;
  }
  // If statusCode is not under 400 and 599, then the request is still valid
  return req.statusCode < 400 || req.statusCode >= 600;
}
