import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',  // Route cho trang chủ
      name: 'TrangChu',
      component: () => import('../Views/Main.vue'),  // Lazy load component SignUpForm
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('../Views/Blog.vue'),
    },
    {
      path: '/BlogDetail',
      name: 'BlogDetail',
      component: () => import('../Views/BlogDetail.vue'),
    }
  ],

})

export default router;