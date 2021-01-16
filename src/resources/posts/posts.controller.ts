import { Request } from "express";
import { AsyncRouter } from "express-async-router";
import { Controller } from "../../framework";
import { authorize } from "../../middleware/authorize.middleware";
import { JwtRequest } from "../../types";
import { PostsService } from "./post.service";
import { Post } from "./post.types";

export class PostsController implements Controller {
  public path = "/posts";

  public router = AsyncRouter();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/", this.getAllPosts);
    this.router.get("/:id", this.getPost);
    this.router.post("/", authorize(), this.createPost);
  }

  getAllPosts = () => {
    return PostsService.findAll();
  };

  getPost = (req: Request<{ id: string }>) => {
    return PostsService.find(req.params.id);
  };

  createPost = (
    req: JwtRequest<
      {},
      Omit<Post, "id" | "author" | "createdAt">,
      {},
      { user: { id: string } }
    >
  ) => {
    console.log(req.user);
    return PostsService.create(req.body, req.user.id);
  };
}
