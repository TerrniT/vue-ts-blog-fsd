/**
 * Post entity interface
 */
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

/**
 * Post list parameters for pagination
 */
export interface PostsParams {
  _page: number;
  _limit: number;
  q?: string;
}