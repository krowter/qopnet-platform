/* eslint-disable @typescript-eslint/no-explicit-any */
declare namespace Express {
  export interface Request {
    user?: any,
    skip: number,
    take: number,
    page: {
      number: string,
      size: string
    }
  }
}
