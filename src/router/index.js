import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/camera',
      name: 'Camera',
      component: () => import('@/pages/Camera.vue'),
    },
    {
      path: '/config',
      name: 'UserConfig',
      component: () => import('@/pages/UserConfig.vue'),
    },
    {
      path: '/edit',
      name: 'ReceiptEdit',
      component: () => import('@/pages/ReceiptEdit.vue'),
    },
    {
      path: '/result',
      name: 'Result',
      component: () => import('@/pages/Result.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login.vue'),
    },
  ],
});

export default router;
