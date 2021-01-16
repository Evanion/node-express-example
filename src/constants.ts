import { JwtAlgorithm } from "./types";

export const PORT = process.env.PORT || 4000;
export const JWT_SECRET =
  process.env.JWT_SECRET || "super-secret-special-agent";
export const JWT_ALGORITHMS: JwtAlgorithm[] = ["HS256"];
