import { User } from './models/user.model'; // Adjust the import path as necessary

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
