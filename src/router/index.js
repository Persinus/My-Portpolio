import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TrangChu',
      component: () => import('../Views/Main.vue'),
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('../Views/Blog.vue'),
    },
    {
      path: '/blog/:id',
      name: 'BlogDetail',
      component: () => import('../Views/BlogDetail.vue'),
      props: true,
    },
    {
      path: '/game',
      name: 'GameList',
      component: () => import('../Views/GameList.vue'),
    },
    {
      path: '/game/:id',
      name: 'GameInterface',
      component: () => import('../Views/GameInterface.vue'),
      props: true
    }
  ],
})

export default router