export interface Post {
  id: string;
  title: string;
  slug: string;
  body: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
  published?: boolean;
  publishedAt?: Date;
}
