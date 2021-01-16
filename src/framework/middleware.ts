import { NextHandleFunction } from "connect";

export type Middleware = (...args: any[]) => NextHandleFunction;
