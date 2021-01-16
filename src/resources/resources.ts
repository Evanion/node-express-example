import { PostsController } from "./posts";
import { UsersController } from "./users";

export const resources = [new UsersController(), new PostsController()];
