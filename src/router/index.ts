import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import CalendarView from '../views/CalendarView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: CalendarView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
