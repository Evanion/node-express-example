import { Post } from "./post.types";
import { v5 as uuidv5 } from "uuid";

const now = new Date();

const NAMESPACE = "2339d050-5725-11eb-a703-b38c8895e8ae";
class Posts {
  private posts: Post[] = [
    {
      id: uuidv5("my-first-post", NAMESPACE),
      title: "My first post",
      slug: "my-first-post",
      body: "This is my first post",
      author: uuidv5("john@doe.com", NAMESPACE),
      createdAt: now,
    },
    {
      id: uuidv5("my-second-post", NAMESPACE),
      title: "My second post",
      slug: "my-second-post",
      body: "This is my second post",
      author: uuidv5("john@doe.com", NAMESPACE),
      createdAt: now,
    },
  ];

  public readonly find = (id: string) =>
    this.posts.find((usr) => usr.id === id);
  public readonly findAll = () => this.posts;
  public readonly create = async (
    post: Omit<Post, "id" | "author" | "createdAt">,
    author: string
  ) => {
    const newPost = {
      id: uuidv5(post.slug, NAMESPACE),
      author,
      createdAt: new Date(),
      ...post,
    };

    if (this.find(newPost.id)) throw Error("duplicate slug");
    this.posts.push(newPost);
    return newPost;
  };
}
export const PostsService = new Posts();
