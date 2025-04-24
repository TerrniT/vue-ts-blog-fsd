import { createRouter, createWebHistory } from 'vue-router';
import { routes } from '@/pages';

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

router.beforeEach((_to, _from, next) => {
  document.body.classList.add('page-transition');
  setTimeout(() => {
    document.body.classList.remove('page-transition');
  }, 300);
  next();
});
