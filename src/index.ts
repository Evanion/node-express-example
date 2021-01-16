import { App } from "./app";
import { resources } from "./resources";
import { middleware } from "./middleware";

const app = new App(resources, middleware);

app.listen();
