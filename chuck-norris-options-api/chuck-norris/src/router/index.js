import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavouritesView from '@/views/FavouritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/jokes',
      name: 'jokes',
      component: () => import('../views/JokesView.vue'),
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: FavouritesView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const validRoutes = ['home', 'jokes', 'favourites'];

  if (!validRoutes.includes(to.name)) {
    return next('/');
  }

  next();
});
export default router
