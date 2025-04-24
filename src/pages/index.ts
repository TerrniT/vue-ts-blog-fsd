import PostsPage from './posts/ui/PostsPage.vue';
import PostDetailsPage from './post-details/ui/PostDetailsPage.vue';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: PostsPage
  },
  {
    path: '/posts/:id',
    name: 'post-details',
    component: PostDetailsPage
  }
];