import { Middleware } from "../framework";
import { logger } from "./logger.middleware";

export const middleware: Middleware[] = [logger];
