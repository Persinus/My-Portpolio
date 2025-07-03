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
    }
  ],
})

export default router