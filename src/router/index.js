import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('../views/MoviesView.vue')
    },
    {
      path: '/actors',
      name: 'actors',
      component: () => import('../views/ActorsView.vue')
    },
    {
      path: '/actors/:actorId',
      name: 'ActorDetails',
      component: () => import('../views/ActorDetailsView.vue'),
      props: true,
    },
    {
      path: '/companies',
      name: 'companies',
      component: () => import('../views/CompaniesView.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue')
    },
    {
      path: '/watch-later',
      name: 'watch later',
      component: () => import('../views/WatchLaterView.vue')
    },
  ],
})

export default router
