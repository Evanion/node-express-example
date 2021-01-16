import jwt from "express-jwt";
import { JWT_ALGORITHMS, JWT_SECRET } from "../constants";
export const authorize = () =>
  jwt({ secret: JWT_SECRET, algorithms: JWT_ALGORITHMS });
