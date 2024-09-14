import { Request, Response, NextFunction } from 'express';

export class AsyncHandler {
    static handleRequest(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
        return (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next))
                .then((result) => {
                    if (result !== undefined) {
                        const status = result.status || 200;
                        delete result.status;
                        res.status(status).json(result);
                    }
                })
                .catch(next);
        }
    }
}
