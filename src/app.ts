import express from "express";
import { json } from "body-parser";
import { Controller } from "./framework";
import { Middleware } from "./framework/middleware";

export class App {
  public app = express();
  public port: number;

  constructor(
    controllers: Controller[] = [],
    middleware: Middleware[] = [],
    port: number = 8080
  ) {
    this.port = port;

    this.initMiddlewares(middleware);
    this.initControllers(controllers);
  }

  private initMiddlewares(middleware: Middleware[]): void {
    this.app.use(json());
    middleware.forEach((mware) => this.app.use(mware()));
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
