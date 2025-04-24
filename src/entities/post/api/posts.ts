import { api } from '@/shared/api/base';
import type { Post, PostsParams } from '../model/types';

/**
 * Posts API service
 */
export const postsApi = {
  /**
   * Get posts with pagination
   */
  getPosts: (params: PostsParams) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    });
    
    return api.get<Post[]>(`/posts?${queryParams.toString()}`);
  },
  
  /**
   * Get a single post by ID
   */
  getPost: (id: number) => {
    return api.get<Post>(`/posts/${id}`);
  },
  
  /**
   * Get total count of posts
   * Note: JSONPlaceholder doesn't have a direct count endpoint,
   * so we fetch just enough data to determine the total
   */
  getPostsCount: async (): Promise<number> => {
    const posts = await api.get<Post[]>('/posts');
    return posts.length;
  }
};