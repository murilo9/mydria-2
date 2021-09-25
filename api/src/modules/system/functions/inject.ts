import { Request, Response } from 'express';

/**
 * Injects a dependency (function) in a middleware. Returns a middleware function acceptable by Express.
 * @param middleware
 * @param dependency
 * @returns
 */
export default function inject(middleware: (req: Request, res: Response, next: Function, dependency: Function) => void, dependency: Function) {
  return (req: Request, res: Response, next: Function): void => {
    middleware(req, res, next, dependency);
  };
}
