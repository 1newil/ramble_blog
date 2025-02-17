export interface payload {
  markdownContent: string;
  title: string;
  thumbnailUrl?: string;
  tags: Tag[];
}

export type Tag = {
  tagText: string;
  color: string;
};

export type Post = {
  _id: string;
  title: string;
  markdownContent: string;
  thumbnailUrl: string;
  slug: string;
  createdAt: string;
  tags: Tag[];
};

export type Posts = {
  blogPosts: Post[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
};
