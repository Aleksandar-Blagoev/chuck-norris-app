import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import sourceData from '@/data.json'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/destination/:id/:slug',
      name: 'destination.show',
      component: () => import('@/views/DestinationShow.vue'),
      props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
      beforeRouteEnter(to, from) {
        const exists = sourceData.destinations.find(
          (destination) => destination.id === parseInt(to.params.id),
        )

        if (!exists) {
          return {
            name: 'notFound',
            params: { patchMatch: to.path.split('/').slice(1) },
            query: to.query,
            hash: to.hash,
          }
        }
      },
      children: [
        {
          path: ':experienceSlug',
          name: 'experience.show',
          component: () => import('@/views/ExperienceShow.vue'),
          props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
        },
      ],
    },
    {
      path: '/:patchMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFound.vue'),
    },
  ],
  linkActiveClass: 'header-active-link',
  // scrollBehavior(to, from, savedPosition) {
  //   console.log("TO ---", to.name)
  //   if (to.name !== 'experience.show') {
  //     return new Promise((res, rej) => {
  //       setTimeout(() => {
  //         res(savedPosition || { top: 0 })
  //       }, 300)
  //     })
  //   }
  // },
})

export default router
