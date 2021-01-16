import { Request } from "express";
import { AsyncRouter } from "express-async-router";
import { sign } from "jsonwebtoken";
import { JWT_ALGORITHMS, JWT_SECRET } from "../../constants";
import { Controller } from "../../framework";
import { UsersService } from "./user.service";
import { LoginInputDto, User } from "./user.types";

export class UsersController implements Controller {
  public path = "/users";

  public router = AsyncRouter();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/", this.getAllUsers);
    this.router.get("/:id", this.getUser);
    this.router.post("/", this.createUser);
    this.router.post("/login", this.login);
  }

  getAllUsers = (): Omit<User, "password">[] => {
    return UsersService.findAll().map(({ password, ...user }) => user);
  };

  getUser = async (req: Request<{ id: string }>) => {
    return Promise.resolve(UsersService.find(req.params.id)).then((user) => {
      if (!user) return;
      const { password, ...usr } = user;
      return usr;
    });
  };

  createUser = (req: Request<{}, Omit<User, "id">>) => {
    return UsersService.create(req.body);
  };

  login = async (req: Request<{}, LoginInputDto>) => {
    const id = await UsersService.login(req.body);
    if (!id) return { error: true, message: "INVALID_DETAILS" };
    return {
      token: sign({ id }, JWT_SECRET, { algorithm: JWT_ALGORITHMS[0] }),
    };
  };
}
