import { Request } from "express";
export interface JwtRequest<
  Params = Record<string, any>,
  ReqBody = any,
  ReqQuery = Record<string, any>,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<Params, Record<string, any>, ReqBody, ReqQuery, Locals> {
  user: { id: string };
}

export type JwtAlgorithm =
  | "HS256"
  | "HS384"
  | "HS512"
  | "RS256"
  | "RS384"
  | "RS512"
  | "ES256"
  | "ES384"
  | "ES512"
  | "PS256"
  | "PS384"
  | "PS512";
