declare module '*routes' {
  import { Express } from 'express';
  const router: (app: Express) => void;
  export default router;
}

declare module '*graphql' {
  import { Express } from 'express';
  const useGraphql: (app: Express) => Promise<void> | void;
  export default useGraphql;
}

declare module 'express' {
  export type Request = any;
  export type Response = any;
  export type NextFunction = any;
  export type Express = any;
  const express: any;
  export default express;
}

declare module 'cors' {
  const cors: any;
  export default cors;
}
