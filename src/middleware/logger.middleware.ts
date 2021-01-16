import { Middleware } from "../framework";

export const logger: Middleware = () => (req, _res, next) => {
  console.log(`${req.method}`);
  next();
};
